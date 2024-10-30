import pexelsClient from "../../services/pexels.api.ts";
import { Photos, ErrorResponse } from "pexels";

export type GridLoaderDataType = Photos | ErrorResponse;

export default async function homeLoader(): Promise<GridLoaderDataType> {
  return await pexelsClient.photos.search({ query: "nature", per_page: 800 });
}
