export interface Comments {
  username: string; // user who commented
  content: string;
}
export interface Post {
  id: number;
  posterId: number;
  caption: string;
  imageUrl: string;
  dateCreated: Date;
  archived: boolean;
}

export interface PostContent {
  postId: number;
  postUser: User; // user who posted
  postImageSrc: string;
  postCaption: string;
  postLikes: number[]; // userId of those who liked
  postComments: Comments[];
  userLikedPhoto: boolean; // TODO check if current user in postLikes
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
    _json: any;
  };
}
