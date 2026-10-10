export type Tag = string;

export interface Author {
  id?: string;
  name: string;
  avatarUrl: string;
  role: string;
}

export interface TableOfContentsItem {
  id: string;
  level: number;
  title: string;
}

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summary?: string; // Compatibilidade com spec e testes
  coverImage?: string;
  tags: Tag[];
  category?: string;
  author: Author;
  readingTimeMinutes: number;
  readTimeMinutes?: number; // Compatibilidade
  publishedAt: string; // ISO 8601
  featured?: boolean;
}

export interface PostDetail extends PostSummary {
  content: string; // Markdown ou texto higienizado
  tableOfContents: TableOfContentsItem[];
}

export interface PageableResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: { field: string; message: string }[];
}

export type Article = PostSummary;
