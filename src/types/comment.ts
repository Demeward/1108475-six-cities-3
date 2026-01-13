

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}


export type NewComment = {
  comment: string;
  rating: number;
}


export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}
