import pexelsClient from "../../services/pexels.api.ts";
import { Photos, ErrorResponse } from "pexels";

export type GridLoaderDataType = Photos | ErrorResponse;

export default async function homeLoader(): Promise<GridLoaderDataType> {
  return await pexelsClient.photos.curated({ per_page: 80 });
}
