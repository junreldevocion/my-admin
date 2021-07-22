import { useEffect, useState } from "react";
import Layout from "../components/layouts"
import api from "../util/api";
import { isLoggedIn } from "../util/auth";

export default function Home({token}) {

    return (
        <Layout title="Home" token={token}>
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3><strong>Analytics</strong> Dashboard</h3>
                </div>
            </div>
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

