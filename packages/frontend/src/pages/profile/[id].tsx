import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout/Layout';
import ProfileAvatar from '../../components/Profile/Avatar';
import { DEFAULT_AVATAR_URL } from '../../constants/sampleData';
import useAuth from '../../hooks/useAuth';
import customFetch from '../../libs/customFetch';
import { Post, User } from '../../types/components';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const userId = context.params?.id;

  const posts = (await customFetch.get(
    '/post/user/?userId=' + userId,
  )) as Post[];
  const user = (await customFetch.get('/user/' + userId)) as User;

  return {
    props: {
      posts,
      user,
    },
  };
};

// TODO add follower count
const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts, user }) => {
  return (
    <Layout>
      <div className="mb-12">
        <ProfileAvatar
          imageUrl={user.googleData?.photos[0].value}
          displayName={user.googleData?.displayName}
        />
        <div className="grid grid-cols-3 gap-3">
          {posts.map((post) => (
            <div
              className="relative h-80 hover:opacity-80 ease-in-out transition-opacity rounded-lg shadow-lg"
              key={post.id}
            >
              <Image
                layout="fill"
                className="object-cover rounded-lg"
                src={post.imageUrl}
                alt={post.imageUrl}
              />
              ;
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
