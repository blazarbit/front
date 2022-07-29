import Head from 'next/head'
import Layout from "../components/layouts/layout";
import React from "react";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Blazarbit</title>
                <link rel="icon" href="/favicon.ico" />
                <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'/>
            </Head>
            body
        </Layout>
    )
}
