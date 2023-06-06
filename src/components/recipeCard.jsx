import authService from "@/utils/authService";
import { useEffect, useState } from "react";

function RecipeCard({ recipe, isLoading }) {
    const [isSaved, setIsSaved] = useState(false)
    const saveRecipe = async () => {
        const { username } = authService.getProfile();
        const recipeData = { username, ...recipe }
        try {
            const newRecipe = await fetch('/api/savedRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authService.getToken()
                },
                body: JSON.stringify(recipeData)
            })
            setIsSaved(true)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (isLoading) {
            setIsSaved(false)
        }
    }, [isLoading])

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-[25px] font-semibold leading-7 text-gray-900">{recipe?.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Servings: {recipe?.servings}</p>
            </div>
            <div className="mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Ingredients</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {
                                recipe?.ingredients.map((item) => {
                                    return <div key={item.name}>- {`${item.name} (${item.amount} ${item.unit})`}<br /></div>
                                })
                            }
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Instructions</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {
                                recipe?.instructions.map((item) => {
                                    return <div key={item}>{recipe?.instructions.indexOf(item) + 1}. {item}<br /></div>
                                })
                            }
                        </dd>
                    </div>
                </dl>
            </div>
            <div className="relative mb-12">
                {
                    isSaved
                        ? <div
                            className="absolute right-0 text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        >Saved!</div>
                        : <button
                            type="button"
                            className="absolute right-0 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            onClick={saveRecipe}
                        >Save Recipe</button>
                }
            </div>
        </div>
    )
}

export default RecipeCard;