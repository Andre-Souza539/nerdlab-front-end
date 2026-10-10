import { PostDetail, PostSummary, PageableResponse } from '@/types/api';
import { MOCK_POSTS, MOCK_CATEGORIES } from './mocks/posts.mock';
import api from '@/lib/api';

export interface GetPostsParams {
  search?: string;
  tag?: string;
  page?: number;
  size?: number;
}

export const postsService = {
  async getPosts(params: GetPostsParams = {}): Promise<PageableResponse<PostSummary>> {
    const { search = '', tag = '', page = 0, size = 10 } = params;
    const isRemote = process.env.NEXT_PUBLIC_API_MODE === 'remote';

    if (isRemote) {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (tag) queryParams.append('tag', tag);
        queryParams.append('page', String(page));
        queryParams.append('size', String(size));

        const res = await api.get<PageableResponse<PostSummary>>(`/posts?${queryParams.toString()}`);
        return res.data;
      } catch (err) {
        console.warn('API remota indisponível, usando fallback de dados locais:', err);
      }
    }

    // Modo Mock em memória
    let filtered = [...MOCK_POSTS];

    if (tag && tag.trim()) {
      const cleanTag = tag.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.category && p.category.toLowerCase() === cleanTag) ||
          p.tags.some((t) => t.toLowerCase() === cleanTag)
      );
    }

    if (search && search.trim()) {
      const cleanSearch = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanSearch) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(cleanSearch)) ||
          (p.summary && p.summary.toLowerCase().includes(cleanSearch)) ||
          p.tags.some((t) => t.toLowerCase().includes(cleanSearch))
      );
    }

    const startIndex = page * size;
    const paginated = filtered.slice(startIndex, startIndex + size);
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size) || 1;

    return {
      content: paginated,
      page,
      size,
      totalElements,
      totalPages,
      isLast: page >= totalPages - 1,
    };
  },

  async getPostBySlug(slug: string): Promise<PostDetail | null> {
    const isRemote = process.env.NEXT_PUBLIC_API_MODE === 'remote';

    if (isRemote) {
      try {
        const res = await api.get<PostDetail>(`/posts/${slug}`);
        return res.data;
      } catch (err) {
        console.warn(`Artigo ${slug} não encontrado na API remota, buscando em mock:`, err);
      }
    }

    const found = MOCK_POSTS.find((p) => p.slug === slug);
    return found || null;
  },

  async getTags(): Promise<string[]> {
    return MOCK_CATEGORIES;
  },
};
