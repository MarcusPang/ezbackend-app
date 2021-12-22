import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DEFAULT_AVATAR_URL } from '../../constants/sampleData';
import useUser from '../../hooks/useUser';
import customFetch from '../../libs/customFetch';

interface SuggestedProfileProps {
  profileId: number;
  username: string;
  avatarUrl: string;
}

const SuggestedProfile = ({
  profileId,
  username,
  avatarUrl,
}: SuggestedProfileProps) => {
  const [followed, setFollowed] = useState(false);
  const { user } = useUser();

  // TODO refactor to SWR
  const handleFollowUser = async () => {
    let data: { success: boolean };
    if (followed) {
      data = await customFetch.delete('follower/unfollow', {
        userId: profileId,
        followerId: user?.id,
      });
    } else {
      const result = await customFetch.post('follower', {
        userId: profileId,
        followerId: user?.id,
      });
      data = {
        success: !!result.id,
      };
    }

    if (data.success) {
      setFollowed((curr) => !curr);
    } else {
      console.error('Unable to ' + followed ? 'unfollow' : 'follow');
    }
  };

  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between relative rounded-full">
        <Image
          width={32}
          height={32}
          className="rounded-full flex mr-3"
          src={avatarUrl}
          alt={`${username} profile picture`}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR_URL;
          }}
        />
        <p className="font-bold text-sm ml-2 mb-[2px]">
          <Link href={`/profile/${profileId}`}>{username}</Link>
        </p>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        {followed ? 'Followed' : 'Follow'}
      </button>
    </div>
  );
};

export default SuggestedProfile;
