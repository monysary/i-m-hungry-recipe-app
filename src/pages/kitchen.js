import Head from "next/head";
import { useEffect } from "react";

import authService from "@/utils/authService";

function Kitchen() {
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
                <title>Chefing it up!</title>
            </Head>
            <div>Kitchen</div>
        </>
    )
}

export default Kitchen;