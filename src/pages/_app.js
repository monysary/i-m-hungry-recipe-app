import "@/styles/globals.css";
import "@/styles/robot.css";

import Layout from "../components/layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>I'm Hungry</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
