import { User } from '../types/components';

const formatGoogleUsername = (user: User) =>
  user &&
  user.googleData.name &&
  (
    (user.googleData.name.givenName + user.googleData.name.familyName) as string
  ).toLowerCase();

export default formatGoogleUsername;
