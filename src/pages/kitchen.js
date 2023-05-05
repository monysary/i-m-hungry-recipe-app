import Head from "next/head";
import { useEffect, useState } from "react";

import authService from "@/utils/authService";
import axios from "axios";

import RecipeCard from '../components/recipeCard'

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

    const [searchState, setSearchState] = useState('')
    const handleSearch = ({ target: { value } }) => {
        setSearchState(value)
    }

    const searchSubmit = (event) => {
        event.preventDefault()

        console.log(searchState)
    }

    return (
        <>
            <Head>
                <title>Chefing it up!</title>
            </Head>
            <div className="min-h-full md:px-[200px] px-6 py-12">
                {/* -----Search Bar----- */}
                {/* <div className="md:text-[30px] text-[16px] mb-[10px]">Time to cook!</div> */}
                {/* <form onSubmit={searchSubmit} className="mb-[10px]">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 "
                            placeholder="Search Ingredients..."
                            type="search"
                            value={searchState}
                            onChange={handleSearch}
                        />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                </form> */}
                <div className="md:text-[30px] text-[16px] mb-[10px]">Select Ingredients</div>
                <div className="mb-[10px]">!----- List of available ingredients goes here -----!</div>
                <button type="button" className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Generate Recipe</button>
                <RecipeCard />
            </div>
        </>
    )
}

export default Kitchen;