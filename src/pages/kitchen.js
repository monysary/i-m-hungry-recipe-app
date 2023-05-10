import Head from "next/head";
import { useEffect, useState } from "react";

import authService from "@/utils/authService";
import axios from "axios";

import RecipeCard from '../components/recipeCard'

import { AiFillCloseCircle } from 'react-icons/ai'
import CircleSpinner from "@/components/spinners/circle";

function Kitchen() {
    useEffect(() => {
        if (authService.loggedIn() && !authService.tokenExpired()) {
            return
        } else {
            window.location.assign('/login')
        }
    })

    const categories = [
        "Protein",
        "Vegetables",
        "Fruits",
        "Grain",
        "Dairy",
        "Butter/Oil",
        "Spice",
        "Seasoning",
        "Other"
    ]

    // Setting ingredient choices
    const [pantryItems, setPantryItems] = useState([]) // Data stored from GET request
    const [recipeForm, setRecipeForm] = useState({
        category: '',
        ingredient: ''
    })
    useEffect(() => {
        const getItems = async () => {
            try {
                const items = await axios.get('/api/pantry/pantry')
                setPantryItems(items?.data)
            } catch (err) {
                console.log(err);
            }
        }

        getItems()
    }, [])
    const handleRecipeForm = ({ target: { name, value } }) => {
        setRecipeForm({
            ...recipeForm,
            [name]: value
        })
    }

    // Selecting ingredients for recipe
    const [ingredientsArr, setIngredientsArr] = useState([])
    const addIngredient = (event) => {
        event.preventDefault();

        if (recipeForm.ingredient !== '' && ingredientsArr.indexOf(recipeForm.ingredient) === -1) {
            setIngredientsArr([
                ...ingredientsArr,
                recipeForm.ingredient
            ])
        }

        return
    }

    //  Removing a selected ingredient
    const removeIngredient = (event) => {
        setIngredientsArr((prev) => prev.filter((item) => item !== event.target.parentElement.id))
    }

    // Generating recipe
    const [recipe, setRecipe] = useState(null)
    const generateRecipe = async () => {
        try {
            const response = await axios.post('/api/gpt/completions', ingredientsArr)
            console.log(response?.data);
            setRecipe(JSON.parse(response?.data))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Head>
                <title>Chefing it up!</title>
            </Head>
            <div className="min-h-full md:px-[200px] px-6 py-12">
                <div className="md:text-[30px] text-[16px] mb-[10px]">Select Ingredients</div>
                <form className="sm:flex items-end mb-[20px]" onSubmit={addIngredient}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Category
                        </label>
                        <div className="sm:mt-2">
                            <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs sm:text-sm sm:leading-6"
                                name="category"
                                onChange={handleRecipeForm}
                            >
                                <option value=''>- select category -</option>
                                {categories.map((category) => {
                                    return (
                                        <option key={category} value={category}>{category}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:ml-[20px] mt-2 sm:mt-0">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Ingredient
                        </label>
                        <div className="sm:mt-2">
                            <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs sm:text-sm sm:leading-6"
                                name="ingredient"
                                onChange={handleRecipeForm}
                            >
                                <option value=''>- select ingredient -</option>
                                {pantryItems.filter((item) => item.category === recipeForm.category).map((item) => {
                                    return (
                                        <option key={item.ingredient} value={item.ingredient}>{item.ingredient}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="mt-2 sm:mt-0 sm:ml-[20px] text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2">Add</button>
                </form>
                <div className="flex flex-wrap gap-[10px] mb-[20px] py-6 border-t border-b border-gray-200">
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
                <button
                    className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-6"
                    type="button"
                    onClick={generateRecipe}
                >Generate Recipe</button>
                <RecipeCard recipe={recipe} />
            </div >
        </>
    )
}

export default Kitchen;