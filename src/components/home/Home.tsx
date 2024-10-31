import { useCallback, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { PhotosWithTotalResults } from "pexels";
import { Masonry } from "./masonry/Masonry.tsx";
import { SearchBar } from "./search-bar/SearchBar.tsx";
import { LoadMore } from "./load-more/LoadMore.tsx";
import { useDebouncedCallback } from "../../hooks/useDebounceCallback.ts";
import {
  HIGHEST_PER_PAGE_SIZE,
  pexelsClient,
} from "../../services/pexels.api.ts";

export function Home() {
  const loaderData = useLoaderData() as PhotosWithTotalResults;
  const [data, setData] = useState<PhotosWithTotalResults>(loaderData);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleDebouncedSearch = useDebouncedCallback(async (value) => {
    setSearchValue(value);
    if (!value) {
      setData(loaderData);
      return;
    }

    setLoading(true);
    const searchResponse = await pexelsClient.photos.search({
      query: value,
      per_page: HIGHEST_PER_PAGE_SIZE,
    });

    setData(searchResponse as PhotosWithTotalResults);
    setLoading(false);
  }, 500);

  const handleOnLoad = useCallback(
    (loadedData: PhotosWithTotalResults) => {
      setData({
        ...loadedData,
        photos: [...data.photos, ...loadedData.photos],
      });
    },
    [data],
  );

  return (
    <>
      <SearchBar onChange={handleDebouncedSearch} loading={loading} />
      <Masonry photos={data.photos} />
      <LoadMore
        onLoad={handleOnLoad}
        page={data.page}
        perPage={data.per_page}
        searchValue={searchValue}
        total={data.total_results}
        count={data.photos.length}
      />
    </>
  );
}
