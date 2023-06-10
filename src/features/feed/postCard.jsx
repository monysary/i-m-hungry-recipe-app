import { useState } from "react";
import getTimeAgo from "@/utils/getTimeAgo";
import CommentsContainer from "./comments/commentsContainer";
import { TbArrowsDiagonal, TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import {
    HeartIcon,
  } from "@heroicons/react/20/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"
import authService from "@/utils/auth/authService";


export default function PostCard({ recipe, comments, userId, recipeLikes, setToggle }) {
    const [visible, setVisible] = useState(false);

    async function handleAddLike(recipeId) {
        try {
            handleSetToggle(false)
            const response = await fetch(`/api/savedRecipe/likes?recipeId=${recipeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: authService.getToken(),
            },
            });
            if (response.ok) {
                handleSetToggle(true)
                return response
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    function handleSetToggle(bool) {
        setToggle(bool)
    }

    return (
        <div className='w-full '>
            {/* Post section */}
            {visible ? (
                <>
                <article className='overflow-hidden shadow rounded-md bg-zinc-50'>
                    {recipe && (
                        <div key={recipe.id}>
                            <div className='flex flex-row justify-between px-2 '>
                                <div className='flex flex-col gap-2 px-2 md:px-4 py-2 sm:px-6 rounded-md'>
                                    <h3 className='font-semibold leading-7 text-gray-900 text-md'>
                                        {recipe.username}
                                    </h3>
                                    <p className='text-gray-500 text-sm italic'>
                                        {getTimeAgo(recipe.updatedAt)}
                                    </p>

                                </div>
                                <div className='mt-4 mr-4 h-12'>
                                    <button
                                        onClick={() => setVisible(!visible)}
                                        className='w-8 flex items-center justify-center bg-stone-200 h-8 text-sm text-black font-medium hover:opacity-70 hover:border border-gray-300 transition ease-out rounded-md'>
                                        <TbArrowsDiagonalMinimize2 size={25} className='hover:scale-95 transition ease-out' />
                                    </button>
                                </div>
                            </div>
                            <div className='border-t border-gray-100 rounded-md'>
                                <dl className='divide-y divide-gray-100 rounded-md'>
                                    <div className='px-4 py-4 sm:gap-4 sm:px-6'>
                                    
                                    <div className="flex flex-row justify-between items-start w-full">
                                            <dd className='mt-1 text-xl leading-6 text-black font-medium sm:col-span-2 sm:mt-0'>
                                                {recipe.title}
                                            </dd>
                                            {
                                                <div className='ml-2 mt-2 flex flex-row gap-2 text-xs items-center justify-end'>
                                                <button onClick={() => handleAddLike(recipe.id)}>
                                                    {!recipeLikes?.likes ? <HeartOutline className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' /> : <HeartIcon className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' />}
                                                </button>
                                                <p> {recipeLikes?.likes ? recipeLikes.likes : 0}</p>
                                                </div>
                                            }
                                        </div></div>
                                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-900'>
                                            <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                                                Recipe information:
                                            </p>
                                        </dt>
                                    </div>
                                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-900'>
                                            Servings
                                        </dt>
                                        <dd className='mt-1 text-lg font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                                            {recipe.servings}
                                        </dd>
                                    </div>
                                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                    <dt className=' text-sm font-medium mb-4 md:mb-0 text-gray-900'>
                                            Nutritional facts
                                        </dt>
                                    <div className="grid grid-cols-2 w-full col-span-2 gap-2 mb-4  bg-white/5 ">
                                        
                                        {recipe.nutritional_facts && Object.entries(recipe?.nutritional_facts)?.map(([factName, factValue]) => {
                                            return (
                                                <div key={factName} className="flex flex-col items-center px-4 py-2 sm:px-6 w-full rounded-md bg-stone-200">
                                                <p className="text-sm font-medium leading-6 text-gray-500">{factName}</p>
                                                <p className="flex items-baseline gap-x-2">
                                                    <span className="text-lg font-semibold tracking-tight text-black">{factValue}</span>
                                                </p>
                                                </div>
                                            )})}
                                    </div>
                                    </div>
                                    <div className='px-4 py-4 sm:grid sm:grid-cols-3  sm:px-6'>
                                        <dt className=' text-sm font-medium  text-gray-900'>
                                            Ingredients
                                        </dt>
                                        <div className='flex flex-col gap-2 '>
                                            {recipe.ingredients &&
                                                recipe.ingredients.map((ingredient, index) => (
                                                    <dd
                                                        key={index}
                                                        className='flex flex-row text-start justify-start  gap-1 text-sm leading-6 text-gray-700  sm:mt-0'>
                                                        <div className='flex flex-row'>
                                                            <p>-</p>
                                                            <p className='w-full font-medium'> {ingredient.name}</p>
                                                        </div>
                                                        <div className='flex flex-row gap-1 italic'>
                                                            <p>{ingredient.amount}</p>
                                                            <p> {ingredient.unit}</p>
                                                        </div>
                                                    </dd>
                                                ))}
                                        </div>
                                    </div>
                                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-900'>
                                            Instructions
                                        </dt>
                                        <div className='col-span-2'>
                                            {recipe.instructions.map((instruction, index) => (
                                                <dd className='mt-1 text-sm leading-6 w-full text-gray-700 sm:mt-0'>
                                                    <div className='flex flex-row w-full gap-2'>
                                                        <p>{index + 1}. </p>
                                                        <p> {instruction}</p>
                                                    </div>
                                                </dd>
                                            ))}
                                        </div>
                                    </div>
                                   {recipe.notes &&  <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-900'>
                                            Notes
                                        </dt>
                                        <div className='col-span-2'>
                                            <dd className='mt-1 text-sm leading-6 w-full text-gray-700 sm:mt-0'>
                                                <div className='flex flex-row w-full gap-2'>
                                                    <p>{recipe.notes} </p>
                                                </div>
                                            </dd>
                                        </div>
                                    </div>}
                                </dl>
                            </div>
                        </div>
                    )}
                </article>
                 {/* Comment section */}
            <section className='px-2'>
            <CommentsContainer comments={comments} recipeId={recipe.id} userId={userId} />
        </section>
        </>
            ) : (
                    <>
                <article className='overflow-hidden bg-zinc-50 shadow rounded-md hover:bg-zinc-100 transition ease-out'>
                    {recipe && (
                        <div key={recipe.id}>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col gap-2 px-2 md:px-4 py-2 sm:px-6 rounded-md'>
                                    <h3 className='font-semibold leading-7 text-gray-900 text-md'>
                                        {recipe.username}
                                    </h3>
                                    <p className='text-gray-500 text-sm italic'>
                                        {getTimeAgo(recipe.updatedAt)}
                                    </p>
                                </div>
                                <div className='mt-4 mr-4 h-12'>
                                    <button
                                        onClick={() => setVisible(!visible)}
                                        className='w-8 flex items-center justify-center bg-stone-200 h-8 text-sm text-black font-medium hover:opacity-70 hover:border border-gray-300 transition ease-out rounded-md'>
                                        <TbArrowsDiagonal size={25} className='hover:scale-105 transition ease-out' />
                                    </button>
                                </div>
                            </div>
                            <div className='border-t border-gray-100 rounded-md'>
                                <dl className='divide-y divide-gray-100 rounded-md'>
                                    <div className='px-4 py-4 sm:gap-4 sm:px-6'>
                                        <div className="flex flex-row justify-between items-start w-full">
                                            <dd className='mt-1 text-xl leading-6 text-black font-medium sm:col-span-2 sm:mt-0'>
                                                {recipe.title}
                                            </dd> 
                                                <div className='ml-2 mt-2 flex flex-row gap-2 text-xs items-center justify-end'>
                                                <button onClick={() => handleAddLike(recipe.id)}>
                                                    {!recipeLikes?.likes ? <HeartOutline className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' /> : <HeartIcon className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' />}
                                                </button>
                                                <p> {recipeLikes?.likes ? recipeLikes.likes : 0}</p>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:flex md:flex-row px-4 gap-2 mb-4  bg-white/5 ">
                                        {recipe.nutritional_facts && <>
                                            <div key='calories' className="flex flex-col items-center px-4 py-2 sm:px-6 w-full rounded-md bg-stone-200">
                                                <p className="text-sm font-medium leading-6 text-gray-500">Calories</p>
                                                <p className="flex items-baseline gap-x-2">
                                                    <span className="text-lg font-semibold tracking-tight text-black">{recipe.nutritional_facts.calories}</span>
                                                </p>
                                            </div>
                                            <div key='protein' className="flex flex-col items-center px-4 py-2 sm:px-6 w-full rounded-md bg-stone-200">
                                                <p className="text-sm font-medium leading-6 text-gray-500">Protein</p>
                                                <p className="flex items-baseline gap-x-2">
                                                    <span className="text-lg font-semibold tracking-tight text-black">{recipe.nutritional_facts.protein}</span>
                                                </p>
                                            </div>
                                            <div key='carbs' className="flex flex-col items-center px-4 py-2 sm:px-6 w-full rounded-md bg-stone-200">
                                                <p className="text-sm font-medium leading-6 text-gray-500">Carbs</p>
                                                <p className="flex items-baseline gap-x-2">
                                                    <span className="text-lg font-semibold tracking-tight text-black">{recipe.nutritional_facts.carbohydrates || recipe.nutritional_facts.carbs}</span>
                                                </p>
                                            </div>
                                            <div key='fats' className="flex flex-col items-center px-4 py-2 sm:px-6 w-full rounded-md bg-stone-200">
                                                <p className="text-sm font-medium leading-6 text-gray-500">Fats</p>
                                                <p className="flex items-baseline gap-x-2">
                                                    <span className="text-lg font-semibold tracking-tight text-black">{recipe.nutritional_facts.fat}</span>
                                                </p>
                                            </div>
                                            </>
                                        }
                                    </div>
                                </dl>
                            </div>
                        </div>
                    )}
                </article>
            </>
            )}
           
        </div>
    );
}
