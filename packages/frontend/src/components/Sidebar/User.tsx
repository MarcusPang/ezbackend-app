import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_AVATAR_URL } from '../../constants/sampleData';
import useAuth from '../../hooks/useAuth';
import formatGoogleUsername from '../../utils/formatGoogleUsername';

const User = () => {
  const { user } = useAuth();
  const username = user && formatGoogleUsername(user);

  return !user?.googleData.displayName || !username ? (
    <Skeleton count={1} height={61} />
  ) : (
    <div className="grid grid-cols-5 gap-4 mb-6 items-center">
      <>
        <div className="flex rounded-full items-center justify-between col-span-1 relative w-16 h-16">
          <Link href={`/p/${username}`} passHref>
            <Image
              layout="fill"
              className="rounded-full cursor-pointer"
              src={user ? user.googleData.photos[0].value : DEFAULT_AVATAR_URL}
              alt={`${username} profile picture`}
            />
          </Link>
        </div>
        <div className="col-span-3">
          <p className="font-bold text-sm">
            <Link href={`/p/${username}`}>{username}</Link>
          </p>
          <p className="text-sm">{user.googleData.displayName}</p>
        </div>
      </>
    </div>
  );
};

export default User;
