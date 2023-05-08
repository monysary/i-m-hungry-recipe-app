import Head from "next/head";
import { useEffect, useState } from "react";

import authService from "@/utils/authService";
import axios from "axios";

import RecipeCard from '../components/recipeCard'

import { AiFillCloseCircle } from 'react-icons/ai'

function Kitchen() {
    useEffect(() => {
        if (authService.loggedIn() && !authService.tokenExpired()) {
            return
        } else {
            window.location.assign('/login')
        }
    })

    const generateRecipe = async () => {
        try {
            const response = await axios.get('/api/gpt/completions')

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const categories = [
        'Protein',
        'Vegetables',
        'Fruits',
        'Grain',
        'Dairy',
        'Butter/Oil',
        'Spice',
        'Seasoning',
        'Other'
    ]

    const ingredients = [
        'Chicken',
        'Apple',
        'Garlic',
        'Potatoes'
    ]

    const [currentSelection, setCurrentSelection] = useState('')
    const [ingredientsArr, setIngredientsArr] = useState([])

    const selectIngredient = (event) => {
        setCurrentSelection(event.target.value)
    }

    const addIngredient = (event) => {
        event.preventDefault();

        if (currentSelection === '') {
            return
        } else {
            setIngredientsArr([...ingredientsArr, currentSelection])
        }
    }

    const removeIngredient = (event) => {
        setIngredientsArr((prev) => prev.filter((item) => item !== event.target.parentElement.id))
    }

    return (
        <>
            <Head>
                <title>Chefing it up!</title>
            </Head>
            <div className="min-h-full md:px-[200px] px-6 py-12">
                <div className="md:text-[30px] text-[16px] mb-[10px]">Select Ingredients</div>
                <div className="flex justify-between items-end mb-[20px]">

                    <form className="flex items-end" onSubmit={addIngredient}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    name="category"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    {categories.map((category) => {
                                        return (
                                            <option key={category}>{category}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="ml-[20px]">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Ingredient
                            </label>
                            <div className="mt-2">
                                <div className="mt-2">
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs sm:text-sm sm:leading-6"
                                        name="ingredient"
                                        onChange={selectIngredient}
                                        value={currentSelection}
                                    >
                                        <option value=''>- select ingredient -</option>
                                        {ingredients.map((ingredient) => {
                                            return (
                                                <option key={ingredient} value={ingredient}>{ingredient}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="ml-[20px] text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2">Add</button>
                    </form>
                </div>
                <div className="flex gap-[10px] mb-[20px] py-6 border-t border-b border-gray-200">
                    {ingredientsArr.map((ingredient) => {
                        return (
                            <div key={ingredient} id={ingredient} className="relative text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                {ingredient}
                                <AiFillCloseCircle id={ingredient} className="absolute right-[-10px] top-[-10px] cursor-pointer text-[20px]"
                                    onClick={removeIngredient}
                                />
                            </div>
                        )
                    })}
                </div>
                <button type="button" className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Generate Recipe</button>
                <RecipeCard />
            </div >
        </>
    )
}

export default Kitchen;