import React, { useState, useEffect } from "react";
import PostCard from "./postCard";
import { motion as m, AnimatePresence } from "framer-motion";
import CircleSpinner from "@/components/spinners/circle";

export default function PostContainer() {
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(comments);
  useEffect(() => {
    fetchRecipes();
    fetchComments();
  }, []);

  async function fetchComments() {
    setLoading(true);
    try {
      const response = await fetch("/api/comment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const comments = await response.json();
      if (response.ok) {
        setComments(comments);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // Fetch all timeline recipes
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/savedRecipe/timeline", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const convertedData = data.map((object) => {
        const updatedObject = { ...object };
        if (typeof object.ingredients === "string") {
          updatedObject.ingredients = JSON.parse(object.ingredients);
        }
        if (typeof object.instructions === "string") {
          updatedObject.instructions = JSON.parse(object.instructions);
        }
        return updatedObject;
      });

      setRecipes(convertedData.reverse());
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return (
      <div className='flex w-full justify-center mt-12'>
        {" "}
        <CircleSpinner />
      </div>
    );
  return (
    <div className='flex justify-center px-2 w-full pb-24'>
      <div className='px-2 pb-24 w-full max-w-4xl'>
        <AnimatePresence>
          {recipes &&
            recipes.map((recipe, index) => (
              <>
                <m.div
                  initial='hidden'
                  animate='visible'
                  viewport={{ once: true, amount: 0.8 }}>
                  <m.div key={index} variants={cardVariantsVertical}>
                    <PostCard recipe={recipe} comments={comments} />
                  </m.div>
                </m.div>
              </>
            ))}
        </AnimatePresence>
      </div>
    </div>
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
