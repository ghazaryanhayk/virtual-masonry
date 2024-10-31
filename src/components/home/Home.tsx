import { useCallback, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { PhotosWithTotalResults } from "pexels";
import { VirtualMasonry } from "./masonry/VirtualMasonry.tsx";
import { SearchBar } from "./search-bar/SearchBar.tsx";
import { LoadMore } from "./load-more/LoadMore.tsx";
import { useDebouncedCallback } from "../../hooks/useDebounceCallback.ts";
import { pexelsClient } from "../../services/pexels.api.ts";

export function Home() {
  const loaderData = useLoaderData() as PhotosWithTotalResults;
  const [data, setData] = useState<PhotosWithTotalResults>(loaderData);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleDebouncedSearch = useDebouncedCallback(async (value) => {
    setSearchValue(value);
    if (value === "") {
      setData(loaderData);
      return;
    }

    try {
      setLoading(true);
      const searchResponse = await pexelsClient.photos.search({
        query: value,
        per_page: 80,
      });

      setData(searchResponse as PhotosWithTotalResults);
    } catch (error) {
      //   TODO: Handle error case
    } finally {
      setLoading(false);
    }
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
      <VirtualMasonry photos={data.photos} />
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
