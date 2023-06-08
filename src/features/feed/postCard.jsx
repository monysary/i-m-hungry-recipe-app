import { useState } from "react";
import getTimeAgo from "@/utils/getTimeAgo";
import CommentsContainer from "./comments/commentsContainer";
import { TbArrowsDiagonal, TbArrowsDiagonalMinimize2 } from "react-icons/tb";


export default function PostCard({ recipe, comments, userId }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className='w-full mb-12'>
            {/* Post section */}
            {visible ? (
                <article className='overflow-hidden shadow rounded-md bg-neutral-50'>
                    {recipe && (
                        <div key={recipe.id}>
                            <div className='flex flex-row justify-between '>
                                <div className='flex flex-col gap-2 px-2 md:px-4 py-2 sm:px-6 rounded-md'>
                                    <p className='text-gray-500 text-sm italic'>
                                        {getTimeAgo(recipe.updatedAt)}
                                    </p>
                                    <h3 className='font-semibold leading-7 text-gray-900 text-md'>
                                        {recipe.username}
                                    </h3>

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
                                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-xl  text-gray-700'>
                                            Recipe name
                                        </dt>
                                        <dd className='mt-1 text-xl leading-6 text-black font-medium sm:col-span-2 sm:mt-0'>
                                            {recipe.title}
                                        </dd>
                                    </div>
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
                                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                                            {recipe.servings}
                                        </dd>
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
                                </dl>
                            </div>
                        </div>
                    )}
                </article>
            ) : (
                <article className='overflow-hidden bg-neutral-100 shadow rounded-md cursor-pointer hover:bg-neutral-50 transition ease-out' onClick={() => setVisible(!visible)}>
                    {recipe && (
                        <div key={recipe.id}>
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col gap-2 px-2 md:px-4 py-2 sm:px-6 rounded-md'>
                                    <p className='text-gray-500 text-sm italic'>
                                        {getTimeAgo(recipe.updatedAt)}
                                    </p>
                                    <h3 className='font-semibold leading-7 text-gray-900 text-md'>
                                        {recipe.username}
                                    </h3>
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
                                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-xl text-gray-700'>
                                            Recipe name
                                        </dt>
                                        <dd className='mt-1 text-xl leading-6 text-black font-medium sm:col-span-2 sm:mt-0'>
                                            {recipe.title}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    )}
                </article>
            )}
            {/* Comment section */}
            <section className='px-2'>
                <CommentsContainer comments={comments} recipeId={recipe.id} userId={userId} />
            </section>
        </div>
    );
}
