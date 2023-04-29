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
            <div>Pantry</div>
        </>
    )
}

export default Pantry;