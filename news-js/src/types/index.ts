export enum Endpoints {
  News = 'everything',
  Sources = 'sources',
}

export type Options = { apiKey?: string; sources?: string };
export type GetRespOptions = { endpoint: Endpoints; options?: Options };
export type Callback = (() => void) | ((data: Data) => void);

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}
export interface Source {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}
export interface Data {
  status: string;
  totalResults: number;
  articles: Array<Article>;
  sources: Array<Source>;
}
