import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout/Layout';
import ProfileInfo from '../../components/Profile/Info';
import usePost from '../../hooks/usePost';
import { Post } from '../../types/components';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => ({
  props: {
    userId: context.params!.id,
  },
});

// TODO add follower count
const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userId }) => {
  const { posts, isLoading } = usePost({ userId: +userId! });

  return (
    <Layout>
      <div className="mb-12">
        <ProfileInfo userId={+userId!} />
        <div className="grid grid-cols-3 gap-3">
          {!isLoading &&
            posts &&
            (posts as Post[]).map((post) => (
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
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
