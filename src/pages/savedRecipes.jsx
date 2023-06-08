import Head from "next/head";
import { useEffect, useState } from "react";
import authService from "@/utils/auth/authService";
import SavedRecipeCard from "@/components/savedRecipeCard";
import SavedRecipesEmptyState from "@/components/emptyStates/savedRecipesEmptyState";

function SavedRecipes() {
  const [toggle, setToggle] = useState(true);
  const [myRecipes, setMyRecipes] = useState();

  useEffect(() => {
    if (authService.loggedIn() && !authService.tokenExpired()) {
      return;
    } else {
      window.location.assign("/login");
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [toggle]);

  // Fetch user's saved recipes from DB
  const fetchRecipes = async () => {
    try {
      const response = await fetch("/api/savedRecipe", {
        headers: {
          "Content-Type": "application/json",
          Authorization: authService.getToken(),
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
      const reverseOrderRecipes = convertedData?.reverse();
      setMyRecipes(reverseOrderRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  if (myRecipes < 1)
    return (
      <div className='flex justify-center h-full md:h-screen pb-24 md:pb-0'>
        <div className='max-w-[1280px] w-full px-2 py-6 mt-24'>
          <SavedRecipesEmptyState />
        </div>
      </div>
    );

   
  return (
    <>
      <Head>
        <title>What am I craving?</title>
      </Head>
      {myRecipes?.length > 0 && (
        <div className='flex justify-center h-screen'>
          <div className='max-w-[1280px] w-full px-2 py-6'>
            <div className='min-h-full  px-4 py-6 '>
              <div>
                <h1 className='md:text-3xl text-2xl  font-medium text-black'>
                  My Recipes
                </h1>
                <div className='py-4'>
                  <SavedRecipeCard
                    myRecipes={myRecipes}
                    setToggle={setToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SavedRecipes;
