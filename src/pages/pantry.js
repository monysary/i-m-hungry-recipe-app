import Head from "next/head";
import { useEffect, useState } from "react";

import authService from "@/utils/authService";

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

    const [updateState, setUpdateState] = useState(false)
    const handleUpdateButton = () => {
        setUpdateState((prev) => !prev)
    }

    return (
        <>
            <Head>
                <title>Checking out the pantry...</title>
            </Head>
            <div className="min-h-full md:px-[200px] px-6 py-12">
                <div className="md:text-[30px] text-[16px] mb-[10px]">Add To Pantry</div>
                <div className="flex justify-between items-end">

                    <form className="flex items-end">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Ingredient
                            </label>
                            <div className="mt-2">
                                <input
                                    name="ingredient"
                                    placeholder="Ingredient..."
                                    required
                                    className="block w-full px-[10px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-teal-500 focus:border-teal-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="ml-[20px]">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
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
                        <button type="submit" className="ml-[20px] text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2">Add</button>
                    </form>

                    <button
                        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
                        onClick={handleUpdateButton}
                    >Update</button>
                </div>
                <div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {categories.map((category) => {
                                return (
                                    <div key={category} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{category}</dt>
                                        <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <div className="flex gap-[10px]">
                                                <div className="relative text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                                    Random
                                                    <button
                                                        className={
                                                            updateState
                                                                ? "absolute right-[-10px] top-[-10px]"
                                                                : "hidden absolute right-[-10px] top-[-10px]"
                                                        }
                                                        onClick={() => console.log('Deletes entry')}
                                                    ><AiFillCloseCircle fontSize='20px' /></button>
                                                </div>
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