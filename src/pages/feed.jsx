import React, { useState, useEffect } from "react";
import PageHeading from "@/features/feed/headings/pageHeading";
import PostContainer from "@/features/feed/postContainer";
import authService from "@/utils/auth/authService";
import FeedSkeleton from "@/components/skeletons/feedSkeleton";

export default function FeedPage() {
  const [userId, setUserId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.loggedIn()) {
      const user = authService.getProfile();
      const userId = user.id
      setUserId(userId)
    }
    fetchTimelineRecipes();
    fetchAllComments();
  }, []);

  // Fetch all timeline recipes
  const fetchTimelineRecipes = async () => {
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch all comments
  async function fetchAllComments() {
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
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className='flex w-full h-screen justify-center '>
      <div className='flex flex-col w-full'>
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
      </div>
    )

  return (
    <div className='flex justify-center h-full min-h-[70vh] pb-24 bg-white'>
      <div className='max-w-[1280px] w-full h-full px-2 md:px-4 py-6 '>
        <PageHeading />
        
        <PostContainer recipes={recipes} comments={comments} userId={userId}/>
      </div>
    </div>
  )
}
