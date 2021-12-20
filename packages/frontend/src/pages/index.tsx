import Head from 'next/head';
import Hero from '../components/Layout/Hero';
import Layout from '../components/Layout/Layout';
import Feed from '../components/Feed/Feed';
import useAuth from '../hooks/useAuth';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const { user } = useAuth();
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
