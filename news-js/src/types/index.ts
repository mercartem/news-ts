export type Options = { apiKey?: string; sources?: string };
export type GetRespOptions = { endpoint: string; options?: Options };
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
export interface Data {
  status: string;
  totalResults: number;
  articles: Array<Article>;
}
