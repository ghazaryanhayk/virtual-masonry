import { ErrorResponse, Photos } from "pexels";
import { pexelsClient } from "../services/pexels.api.ts";

export type GridLoaderDataType = Photos | ErrorResponse;

export async function homeLoader(): Promise<GridLoaderDataType> {
  return await pexelsClient.photos.curated({ per_page: 80 });
}
