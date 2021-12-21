import Image from 'next/image';
import { DEFAULT_AVATAR_URL } from '../../constants/sampleData';

interface AvatarProps {
  imageUrl: string;
  displayName: string;
}

const ProfileAvatar = ({ imageUrl, displayName }: AvatarProps) => {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-4 mb-12">
      <div className="avatar h-40 w-40 rounded-full col-span-1">
        <Image
          src={imageUrl || DEFAULT_AVATAR_URL}
          layout="fill"
          alt="avatar"
          className="rounded-full"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR_URL;
          }}
        />
      </div>
      <div className="col-span-3 py-10">
        <h3 className="font-bold text-lg mb-4">{displayName}</h3>
        <span>Hello world</span>
      </div>
    </div>
  );
};

export default ProfileAvatar;
