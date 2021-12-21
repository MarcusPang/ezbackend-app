import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_AVATAR_URL } from '../../constants/sampleData';

interface HeaderProps {
  username: string;
  avatarUrl: string;
  userId: number;
}

const PostHeader = ({ userId, username, avatarUrl }: HeaderProps) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center relative">
        <Link href={`/profile/${userId}`} passHref>
          <>
            <Image
              layout="fill"
              className="rounded-full h-8 w-8 flex mr-3"
              src={avatarUrl}
              alt={`${username} profile picture`}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR_URL;
              }}
            />
            <p className="font-bold">{username}</p>
          </>
        </Link>
      </div>
    </div>
  );
};

export default PostHeader;
