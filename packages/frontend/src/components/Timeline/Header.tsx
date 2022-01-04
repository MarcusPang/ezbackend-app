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
        <Image
          className="rounded-full"
          height={36}
          width={36}
          src={avatarUrl}
          alt={`${username} profile picture`}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR_URL;
          }}
        />
        <Link href={`/profile/${userId}`} passHref>
          <a className="font-bold ml-2">{username}</a>
        </Link>
      </div>
    </div>
  );
};

export default PostHeader;
