import Head from "next/head";
import { useEffect } from "react";

import authService from "@/utils/authService";

function Pantry() {
    useEffect(() => {
        if (authService.loggedIn() && !authService.tokenExpired()) {
            return
        } else {
            window.location.assign('/login')
        }
    })

    return (
        <>
            <Head>
                <title>Checking out the pantry...</title>
            </Head>
            <div className="min-h-full md:px-[200px] px-6 py-12">
                <div className="md:text-[30px] text-[16px] mb-[10px]">Add To Pantry</div>
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
                                <option>Protein</option>
                                <option>Vegetables</option>
                                <option>Fruits</option>
                                <option>Dairy</option>
                                <option>Butter/Oil</option>
                                <option>Spice</option>
                                <option>Seasoning</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="ml-[20px] text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2">Add</button>
                </form>
            </div>
        </>
    )
}

export default Pantry;