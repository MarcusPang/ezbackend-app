import { NextPage } from 'next';
import Head from 'next/head';
import Feed from '../components/Feed/Feed';
import Hero from '../components/Layout/Hero';
import Layout from '../components/Layout/Layout';
import useUser from '../hooks/useUser';

const Home: NextPage = () => {
  const { user } = useUser();
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
      <Layout>{user ? <Feed /> : <Hero />}</Layout>
    </>
  );
};

export default Home;
