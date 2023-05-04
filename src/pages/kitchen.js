import Head from "next/head";
import { useEffect } from "react";

import authService from "@/utils/authService";
import axios from "axios";

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

    generateRecipe()

    return (
        <>
            <Head>
                <title>Chefing it up!</title>
            </Head>
            <div>Kitchen</div>
        </>
    )
}

export default Kitchen;