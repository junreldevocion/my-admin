import { useEffect, useState } from "react";
import Layout from "../components/layouts"
import api from "../util/api";
import { isLoggedIn } from "../util/auth";

export default function Home({token}) {

    return (
        <Layout title="Home" token={token}>
            <h1 className="h3 mb-3"><strong>Analytics</strong> Dashboard</h1>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const cookie = isLoggedIn(context?.req?.headers.cookie || '')

    // const user = api().get('api/user', { headers: {"Authorization" : `Bearer ${cookie.token}`} });

    // const [userData] = await Promise.all([user]);
    
    if ( !cookie.isLoggedIn && !cookie.token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }


    return { props: JSON.parse(JSON.stringify(cookie)) };
}

