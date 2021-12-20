export interface Comments {
  username: string; // user who commented
  content: string;
}

export interface PostContent {
  postId: string;
  postUser: string; // user who posted
  postImageSrc: string;
  postCaption: string;
  postLikes: number[]; // userId of those who liked
  postComments: Comments[];
  userLikedPhoto: boolean;
  dateCreated: Date;
}

// google user only
export interface User {
  id: number;
  googleId: string;
  googleData: {
    id: string;
    displayName: string;
    name: {
      familyName: string;
      givenName: string;
    };
    emails: {
      value: string;
      verified: boolean;
    }[];
    photos: { value: string }[];
    provider: string;
    _raw: any;
  };
}

export interface Profile {
  userId: number;
  username: string;
}
