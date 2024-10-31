import { useLoaderData } from "react-router-dom";
import type { Photo, Photos, PhotosWithTotalResults } from "pexels";
import { VirtualMasonry } from "./masonry/VirtualMasonry.tsx";
import { SearchBar } from "./search-bar/SearchBar.tsx";
import { useState } from "react";
import { useDebouncedCallback } from "../../hooks/useDebounceCallback.ts";
import { pexelsClient } from "../../services/pexels.api.ts";

export function Home() {
  const loaderData = useLoaderData() as Photos;
  const [photos, setPhotos] = useState<Photo[]>(loaderData.photos);
  const [loading, setLoading] = useState(false);

  const handleDebouncedChange = useDebouncedCallback(async (value) => {
    if (value === "") {
      setPhotos(loaderData.photos);
      return;
    }

    try {
      setLoading(true);
      const searchResponse = await pexelsClient.photos.search({
        query: value,
        per_page: 80,
      });

      setPhotos((searchResponse as PhotosWithTotalResults).photos);
    } catch (error) {
      //   TODO: Handle error case
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <>
      <SearchBar onChange={handleDebouncedChange} loading={loading} />
      <VirtualMasonry photos={photos} />
    </>
  );
}
