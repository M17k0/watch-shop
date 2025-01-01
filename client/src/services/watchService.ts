import { Watch } from "@/models/watchCard";
import { httpService } from "./httpService";

interface LoadWatchesResponse {
  watches: Watch[];
  total: number;
}

class WatchService {
  async loadWatches(searchTerm?: string, page = 1, pageSize = 10) {
    const { result } = await httpService.get<LoadWatchesResponse>("/products", {
      query: {
        page, pageSize, searchTerm,
      },
    });

    return result
  }
}

export const watchService = new WatchService();
