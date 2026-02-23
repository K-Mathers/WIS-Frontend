export interface IBlogCards {
  id: number;
  cardTitle: string;
  cardDescription: string;
  cardShortDescription: string;
  firtAnotherCard: string;
  secondAnotherCard: string;
}

interface IMeta {
  total: number;
  page: number;
  lastPage: number;
}
interface IAuthor {
  id: string;
  email: string;
}
export interface IData {
  id: string;
  author: IAuthor;
  category: string;
  coverImage: string;
  createdAt: string;
  publishedAt: string;
  shortDescription: string;
  slug: string;
  title: string;
  views: number;
  content: string;
}
export interface IBlog {
  data: IData[];
  meta: IMeta;
}

export interface ICommentState {
  id: string;
  likes: number;
  dislikes: number;
  myReaction: null | "LIKE" | "DISLIKE";
  content: string;
  createdAt: string;
  author: IAuthor;
}

export type IBlogMapping = Record<string, IData | undefined>;
