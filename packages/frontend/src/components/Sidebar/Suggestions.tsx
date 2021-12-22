import Skeleton from 'react-loading-skeleton';
import useSuggestions from '../../hooks/useSuggestions';
import formatGoogleUsername from '../../utils/formatGoogleUsername';
import SuggestedProfile from './SuggestedProfile';

const Suggestions = () => {
  const { profiles, isLoading } = useSuggestions();

  return isLoading ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles && profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.id}
            profileId={profile.id}
            username={formatGoogleUsername(profile)}
            avatarUrl={profile.googleData.photos[0].value}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
