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

// google user only
// TODO format user information for security reasons
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

export interface Error {
  statusCode: number;
  error: string;
  message: string;
}

export interface CustomSuccess {
  success: boolean;
}

export type CustomResponse = Error | CustomSuccess;
