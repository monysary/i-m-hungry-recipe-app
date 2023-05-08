import Head from "next/head";
import { useEffect } from "react";

import authService from "@/utils/authService";

import SavedRecipeCard from "@/components/savedRecipeCard";

function SavedRecipes() {
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
                <title>What am I craving?</title>
            </Head>
            <div className="min-h-full md:px-[200px] px-6 py-12">
                <div className="md:text-[30px] text-[16px] mb-[10px]">My Recipes</div>
                <div className=" mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-200">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <SavedRecipeCard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SavedRecipes;