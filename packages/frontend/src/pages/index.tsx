import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Feed from '../components/Feed/Feed';
import Alert from '../components/Layout/Alert';
import Hero from '../components/Layout/Hero';
import Layout from '../components/Layout/Layout';
import useUser from '../hooks/useUser';

const Home: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { postSuccess } = router.query;

  useEffect(() => {
    if (postSuccess) {
      setShowAlert(true);
    }
  }, [postSuccess]);

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
        {user ? (
          <>
            {showAlert && (
              <Alert
                message="Post uploaded!"
                buttons={[
                  {
                    class: 'btn-primary',
                    name: 'close',
                    fn: () => setShowAlert(false),
                  },
                ]}
              />
            )}
            <Feed />
          </>
        ) : (
          <Hero />
        )}
      </Layout>
    </>
  );
};

export default Home;
