import Head from 'next/head'

export default function Header({title}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated my admin" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}