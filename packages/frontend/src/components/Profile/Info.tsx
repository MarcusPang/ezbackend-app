import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_AVATAR_URL } from '../../constants/sampleData';
import useUser from '../../hooks/useUser';
interface AvatarProps {
  userId: number;
}

const ProfileAvatar = ({ userId }: AvatarProps) => {
  const { user, isLoading } = useUser(+userId!);

  console.log(user && user.followers);

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-4 mb-12">
      <div className="avatar h-40 w-40 rounded-full col-span-1">
        {isLoading ? (
          <Skeleton count={1} height={160} width={160} />
        ) : (
          user && (
            <Image
              src={user.googleData.photos[0].value || DEFAULT_AVATAR_URL}
              layout="fill"
              alt="avatar"
              className="rounded-full"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR_URL;
              }}
            />
          )
        )}
      </div>
      <div className="col-span-3 py-10">
        <h3 className="font-bold text-lg mb-1">
          {!isLoading && user && user.googleData.displayName}
        </h3>
        <h4 className="font-semibold mb-5">
          {!isLoading &&
            user &&
            user.followers &&
            `Followers: ${user.followers.length} Following: ${user.following.length}`}
        </h4>
        <span>Sample text</span>
      </div>
    </div>
  );
};

export default ProfileAvatar;
