import { Category, Tag } from '@/models/watchCard';
import { httpService } from './httpService';

class CategoryService {
  async getCategories() {
    const { result } = await httpService.get<Category[]>('/categories');

    return result;
  }

  async getTagsForCategory(categoryId: number) {
    const { result } = await httpService.get<Tag[]>(
      `/categories/${categoryId}/tags`,
    );

    return result;
  }
}

export const categoryService = new CategoryService();
