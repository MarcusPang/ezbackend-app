import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { suggestedProfiles } from '../../constants/sampleData';
import { Profile } from '../../types/components';
import SuggestedProfile from './SuggestedProfile';

const Suggestions = () => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);

  useEffect(() => {
    setProfiles(suggestedProfiles);
  }, []);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile key={profile.userId} profileId={profile.userId} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
