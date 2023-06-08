import PostCard from "./postCard";
import { motion as m, AnimatePresence } from "framer-motion";

export default function PostContainer({ recipes, comments, userId }) {
  return (
    <section className='flex justify-center px-0 w-full pb-24 '>
      <div className='pb-24 w-full max-w-4xl'>
        <AnimatePresence>
          {recipes &&
            recipes.map((recipe) => (
              <div key={recipe.id}>
                <m.div
                  initial='hidden'
                  animate='visible'
                  viewport={{ once: true, amount: 0.8 }}>
                  <m.div variants={cardVariantsVertical}>
                    <PostCard recipe={recipe} comments={comments} userId={userId} />
                  </m.div>
                </m.div>
              </div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
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
};
