export interface News {
  id: string;
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
  imageUrl: string;
  position: number;
  category: string;
}

export interface SearchParameters {
  q: string;
  type: string;
  engine: string;
}

export interface SearchNewsResponse {
  searchParameters: SearchParameters;
  news: News[];
}
