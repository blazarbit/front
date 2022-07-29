import Head from 'next/head'
import React from "react";
import { Layout } from '../components/layouts';

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Blazarbit</title>
            </Head>
        </Layout>
    )
}
