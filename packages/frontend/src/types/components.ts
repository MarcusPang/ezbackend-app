export interface Comments {
  username: string; // user who commented
  content: string;
}

export interface Comment {
  postId: number;
  commenterId: number;
  commenterUsername: string;
  content: string;
}

export interface Post {
  id: number;
  posterId: number;
  caption: string;
  imageUrl: string;
  dateCreated: Date;
  archived: boolean;
  likedBy: User[];
  poster: User;
}

export interface PostContent {
  id: number;
  poster: User; // user who posted
  imageUrl: string;
  caption: string;
  likes: number[]; // userId of those who liked
  comments: Comments[];
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
  followers: User[];
  following: User[];
}
