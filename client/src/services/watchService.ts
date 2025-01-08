import { Watch } from '@/models/watchCard';
import { httpService } from './httpService';

interface LoadWatchesResponse {
  watches: Watch[];
  total: number;
}

class WatchService {
  async loadWatches(
    query?: string,
    page = 1,
    pageSize = 10,
    tags: number[] = [],
    orderBy = 'name',
    order = 'asc',
  ) {
    const { result } = await httpService.get<LoadWatchesResponse>('/products', {
      query: {
        page,
        pageSize,
        query,
        tags: tags.join('-'),
        orderBy,
        order,
      },
    });

    return result;
  }

  async loadWatch(id: number) {
    const { result } = await httpService.get<Watch>(`/products/${id}`);

    return result;
  }

  async addTagToProduct(productId: number, tagId: number) {
    await httpService.post(`/products/${productId}/tags/${tagId}`, {});
  }
}

export const watchService = new WatchService();
