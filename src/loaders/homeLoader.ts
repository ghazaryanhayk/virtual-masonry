import { ErrorResponse, Photos } from "pexels";
import { HIGHEST_PER_PAGE_SIZE, pexelsClient } from "../services/pexels.api.ts";

export type GridLoaderDataType = Photos | ErrorResponse;

export async function homeLoader(): Promise<GridLoaderDataType> {
  return await pexelsClient.photos.curated({ per_page: HIGHEST_PER_PAGE_SIZE });
}
