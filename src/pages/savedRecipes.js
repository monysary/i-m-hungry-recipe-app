import Head from "next/head";
import { useEffect } from "react";

import authService from "@/utils/authService";

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
            <div>Saved Recipes</div>
        </>
    )
}

export default SavedRecipes;