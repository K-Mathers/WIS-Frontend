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
  author: IAuthor;
  category: string;
  coverImage: string;
  createdAt: string;
  id: string;
  publishedAt: string;
  shortDescription: string;
  slug: string;
  title: string;
  views: number;
}
export interface IBlog {
  data: IData[];
  meta: IMeta;
}

export type IBlogMapping = Record<string, IData | undefined>;
