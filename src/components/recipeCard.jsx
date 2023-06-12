import authService from "@/utils/auth/authService"
import { useEffect, useState } from "react"
import SuccessNotification from "./alerts/successNotification"

function RecipeCard({ recipe, isLoading }) {
  const [isSaved, setIsSaved] = useState(false)
  const [success, setSuccess] = useState(false)

  async function saveRecipe() {
    const recipeData = recipe
    try {
      setSuccess(false)
      await fetch("/api/savedRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authService.getToken(),
        },
        body: JSON.stringify(recipeData),
      })
      setIsSaved(true)
      console.log("recipe: ", recipeData)
    } catch (err) {
      console.log(err)
    } finally {
      setSuccess(true)
    }
  }

  useEffect(() => {
    if (isLoading) {
      setIsSaved(false)
    }
  }, [isLoading])

  return (
    <div>
      {success && (
        <div className=''>
          {" "}
          <SuccessNotification
            title='Successfully saved recipe!'
            message=''
            btnTitle='View recipes'
            href='/savedRecipes'
          />{" "}
        </div>
      )}
      <div className='px-4 sm:px-0'>
        <h3 className='text-[25px] font-semibold leading-7 text-gray-900'>
          {recipe?.title}
        </h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
          Servings: {recipe?.servings}
        </p>
      </div>
      <div className='mt-6 border-t border-gray-200'>
        <dl className='divide-y divide-gray-200'>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Nutritional facts
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700  md:w-full sm:mt-0'>
              <div className='grid grid-cols-2 md:flex md:flex-row gap-2  bg-white/5 '>
                {recipe.nutritional_facts &&
                  Object.entries(recipe?.nutritional_facts)?.map(
                    ([factName, factValue]) => {
                      return (
                        <div
                          key={factName}
                          className='bg-stone-200 px-4 py-2 sm:px-6  rounded-md'>
                          <p className='text-sm font-medium leading-6 text-gray-500'>
                            {factName}
                          </p>
                          <p className='mt-2 flex items-baseline gap-x-2'>
                            <span className='text-2xl font-semibold tracking-tight text-black'>
                              {factValue}
                            </span>
                            <span className='text-md font-semibold'>
                              {factName === "calories" ? " kcal" : " g"}
                            </span>
                          </p>
                        </div>
                      )
                    }
                  )}
              </div>
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Ingredients
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {recipe?.ingredients.map((item) => {
                return (
                  <div key={item.name}>
                    - {`${item.name} (${item.amount} ${item.unit})`}
                    <br />
                  </div>
                )
              })}
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Instructions
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {recipe?.instructions.map((item) => {
                return (
                  <div key={item}>
                    {recipe?.instructions.indexOf(item) + 1}. {item}
                    <br />
                  </div>
                )
              })}
            </dd>
          </div>
        </dl>
      </div>
      <div className='relative mb-12'>
        {isSaved ? (
          <div className='absolute right-0 text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'>
            Saved!
          </div>
        ) : (
          <button
            type='button'
            className='absolute right-0 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
            onClick={saveRecipe}>
            Save Recipe
          </button>
        )}
      </div>
    </div>
  )
}

export default RecipeCard
