import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  username: string;
}

const PostHeader = ({ username }: HeaderProps) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center relative">
        <Link href={`/p/${username}`} passHref>
          <Image
            layout="fill"
            className="rounded-full h-8 w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile picture`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

export default PostHeader;
