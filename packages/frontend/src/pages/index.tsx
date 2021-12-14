import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sample Ezbackend App</title>
        <meta
          name="description"
          content="Sample App using Ezbackend and NextJS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>test</div>
      </Layout>
    </>
  );
}
