import { ErrorResponse, Photo } from "pexels";
import { Params } from "react-router-dom";
import { pexelsClient } from "../services/pexels.api.ts";

export type PreviewLoaderDataType = Photo | ErrorResponse;

export async function previewLoader({
  params,
}: {
  params: Params<"id">;
}): Promise<PreviewLoaderDataType> {
  if (params.id === undefined) {
    return {
      error: "Photo id cannot be undefined",
    };
  }
  return await pexelsClient.photos.show({ id: params.id });
}
