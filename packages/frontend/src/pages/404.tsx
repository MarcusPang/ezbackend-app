import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';

const NotFoundPage: NextPage = () => {
  const router = useRouter();

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
        <div className="text-center">
          <div className="mb-3">Page not found/in development!</div>
          <button
            onClick={() => router.back()}
            className="btn btn-primary mb-10"
          >
            Click here to go back
          </button>
        </div>
      </Layout>
    </>
  );
};

export default NotFoundPage;
