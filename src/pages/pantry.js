import Head from "next/head";
import { useEffect, useState } from "react";

import authService from "@/utils/authService";
import axios from "axios";

import { AiFillCloseCircle } from 'react-icons/ai'

function Pantry() {
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

    const [toggle, setToggle] = useState(true)
    const [updateState, setUpdateState] = useState(false)
    const handleUpdateButton = () => {
        setUpdateState((prev) => !prev)
    }

    // Get items from pantry
    const [pantryItems, setPantryItems] = useState([])
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
    }, [toggle])

    // Delete items from pantry
    const handleDelete = async (event) => {
        const ingredient = event.target.parentElement.id

        await axios.delete(`/api/pantry/pantry?ingredient=${ingredient}`)

        setToggle((prev) => !prev)
    }

    // Add items to pantry
    const addToPantry = async (event) => {
        event.preventDefault();
        const ingredient = event.target[0].value
        const category = event.target[1].value

        const response = await axios.post('/api/pantry/pantry', {
            ingredient: ingredient,
            category: category
        })

        setToggle((prev) => !prev)
    }

    return (
        <>
            <Head>
                <title>Checking out the pantry...</title>
            </Head>
            <div className="min-h-full md:px-[200px] px-6 py-12">
                <div className="md:text-[30px] text-[16px] mb-[10px]">Add To Pantry</div>
                <div className="sm:flex justify-between items-end">

                    <form className="sm:flex items-end" id="pantry-form" onSubmit={addToPantry}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mt-2 sm:mt-0">
                                Ingredient
                            </label>
                            <div className="sm:mt-2">
                                <input
                                    name="ingredient"
                                    placeholder="Ingredient..."
                                    required
                                    className="block w-full px-[10px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-teal-500 focus:border-teal-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:ml-[20px]">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mt-2 sm:mt-0">
                                Category
                            </label>
                            <div className="sm:mt-2">
                                <select
                                    name="category"
                                    placeholder="Select category"
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
                        <button type="submit" className="hidden sm:block mt-2 sm:mt-0 sm:ml-[20px] text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2">Add</button>
                    </form>

                    <div className="mt-4 sm:mt-0 flex justify-center">
                        <button
                            className="sm:hidden text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2"
                            type="submit"
                            form="pantry-form"
                        >Add</button>
                        <button
                            className="ml-[10px] sm:ml-0 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
                            onClick={handleUpdateButton}
                        >Update</button>
                    </div>
                </div>
                <div>
                    <div className="mt-6 border-t border-gray-200">
                        <dl className="divide-y divide-gray-200">
                            {categories.map((category) => {
                                return (
                                    <div key={category} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{category}</dt>
                                        <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <div className="flex flex-wrap gap-[10px]">
                                                {pantryItems.filter((item) => item.category === category).map((item) => {
                                                    return (
                                                        <div
                                                            className="relative text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                                            key={item.ingredient}
                                                            id={item.ingredient}
                                                        >
                                                            {item.ingredient}
                                                            <AiFillCloseCircle
                                                                id={item.ingredient}
                                                                className={
                                                                    updateState
                                                                        ? "absolute right-[-10px] top-[-10px] cursor-pointer text-[20px]"
                                                                        : "hidden absolute right-[-10px] top-[-10px] cursor-pointer text-[20px]"
                                                                }
                                                                onClick={handleDelete}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pantry;