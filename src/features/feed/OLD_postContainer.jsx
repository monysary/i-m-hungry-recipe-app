import { useState, useEffect } from "react"
import PostCard from "./OLD_postCard"
import { motion as m, AnimatePresence } from "framer-motion"

export default function PostContainer({ recipes, comments, userId, setFeedToggle }) {
  const [recipeLikes, setRecipeLikes] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    fetchAllLikes()
  }, [toggle])
  // fetch all recipe likes
  async function fetchAllLikes() {
    try {
      const response = await fetch(`/api/savedRecipe/likes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const likes = await response.json()
      if (response.ok) {
        setRecipeLikes(likes)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className='flex justify-center px-0 w-full pb-24 '>
      <div className='md:grid md:grid-cols-2 flex flex-col gap-8 pb-24 w-full '>
        <AnimatePresence>
          {recipes &&
            recipes.map((recipe) => (
              <div key={recipe.id}>
                <m.div
                  initial='hidden'
                  animate='visible'
                  viewport={{ once: true, amount: 0.8 }}>
                  <m.div variants={cardVariantsVertical}>
                    <PostCard
                      recipe={recipe}
                      comments={comments}
                      userId={userId}
                      setToggle={setToggle}
                      setFeedToggle={setFeedToggle}
                      recipeLikes={recipeLikes.find(
                        (like) => like.recipeId === recipe.id
                      )}
                    />
                  </m.div>
                </m.div>
              </div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

const cardVariantsVertical = {
  hidden: {
    y: 150,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}
