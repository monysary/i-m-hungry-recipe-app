import CircleSpinner from '@/components/spinners/circle';
import authService from '@/utils/authService'
import getTimeAgo from '@/utils/getTimeAgo';
import { Textarea } from 'flowbite-react';
import { useState, useEffect } from 'react'

function separateSteps(instructions) {
    const steps = JSON.parse(instructions);
    return steps.map((step, index) => `${index + 1}. ${step}`);
}

function separateIngredients(ingredients) {
    const parsedIngredients = JSON.parse(ingredients);
    return parsedIngredients.map((ingredient, index) => {
        return `${index + 1}. ${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`;
    });
}
export default function PostCard({ recipe }) {
    const [username, setUsername] = useState();
    const instructions = separateSteps(recipe[0].instructions);
    const ingredients = separateIngredients(recipe[0].ingredients);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch('/api/user/username', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authService?.getToken(),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data)
                } else {
                    throw new Error('Error fetching data');
                }
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    console.log(recipe)
    if (error) return (<p>{error}</p>)
    if (loading) return (<CircleSpinner />)
    return (
        <div className='w-full'>
            {visible ? (
                <div className="overflow-hidden bg-white shadow rounded-md">
                    {recipe?.map(recipe => (
                        <div key={recipe.id}>
                            <div className='flex flex-row justify-between '>
                                <div className="flex flex-col gap-2 px-2 md:px-4 py-6 sm:px-6 rounded-md">
                                    <p className='text-gray-500 text-sm italic'>{getTimeAgo(recipe.updatedAt)}</p>
                                    <h3 className="font-semibold leading-7 text-gray-900 text-xl">{username}</h3>
                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Recipe information.</p>
                                </div>
                                <div className='pr-4 mt-6 w-24 h-12'>
                                    <button onClick={() => setVisible(!visible)} className='w-24 p-2 rounded-md bg-gray-200 h-12 text-black font-medium hover:bg-gray-100 transition ease-out'>See less</button>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 rounded-md">
                                <dl className="divide-y divide-gray-100 rounded-md">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-900">Recipe Name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{recipe.title}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-900">Servings</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{recipe.servings}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-900">Ingredients</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ingredients}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-900">Instructions</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{instructions}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<div className="overflow-hidden bg-white shadow rounded-md">
                {recipe?.map(recipe => (
                    <div key={recipe.id}>
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col gap-2 px-2 md:px-4 py-6 sm:px-6 rounded-md">
                                <p className='text-gray-500 text-sm italic'>{getTimeAgo(recipe.updatedAt)}</p>
                                <h3 className="font-semibold leading-7 text-gray-900 text-xl">{username}</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Recipe information.</p>
                            </div>
                            <div className='pr-4 mt-6 w-24 h-12'>
                                <button onClick={() => setVisible(!visible)} className='w-24 p-2 rounded-md bg-gray-200 h-12 text-black font-medium hover:bg-gray-100 transition ease-out'>See more</button>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 rounded-md">
                            <dl className="divide-y divide-gray-100 rounded-md">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Recipe Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{recipe.title}</dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                ))}
            </div>)
            }
            <form htmlFor='comment' className=' mt-4 ' >
                <textarea htmlFor='comment' placeholder='Leave a comment' className='rounded-md w-full' />
                <button className='p-2 mt-2 w-36 bg-orange-600 hover:bg-orange-500 transition ease-out text-white rounded-md'>Submit</button>
            </form>
        </div>
    )
}
