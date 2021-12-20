import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DEFAULT_AVATAR_URL } from '../../constants/sampleData';
import useAuth from '../../hooks/useAuth';
import formatGoogleUsername from '../../utils/formatGoogleUsername';

interface SuggestedProfileProps {
  profileId: number;
}

const SuggestedProfile = ({ profileId }: SuggestedProfileProps) => {
  const [followed, setFollowed] = useState(false);
  const { user } = useAuth();
  const username = user && formatGoogleUsername(user);

  // TODO get other persons' data
  async function handleFollowUser() {
    setFollowed(true);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between relative rounded-full w-8 h-8">
        <Image
          layout="fill"
          className="rounded-full flex mr-3"
          src={user ? user.googleData.photos[0].value : DEFAULT_AVATAR_URL}
          alt={`${username} profile picture`}
        />
        <p className="font-bold text-sm ml-10">
          <Link href={`/p/${username}`}>{username}</Link>
        </p>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;
