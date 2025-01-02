import { Watch } from "@/models/watchCard";
import { httpService } from "./httpService";

interface LoadWatchesResponse {
  watches: Watch[];
  total: number;
}

class WatchService {
  async loadWatches(query?: string, page = 1, pageSize = 10) {
    const { result } = await httpService.get<LoadWatchesResponse>("/products", {
      query: {
        page, pageSize, query,
      },
    });

    return result
  }

  async loadWatch(id: number) {
    const { result } = await httpService.get<Watch>(`/products/${id}`);

    return result;
  }
}

export const watchService = new WatchService();
