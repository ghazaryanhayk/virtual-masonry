import { useCallback, useState } from "react";
import type { PhotosWithTotalResults } from "pexels";
import styled from "@emotion/styled";
import { pexelsClient } from "../../../services/pexels.api.ts";

type LoadMoreProps = {
  page: number;
  perPage: number;
  onLoad(loadedData: PhotosWithTotalResults): void;
  count: number;
  total: number;
  searchValue?: string;
};

export function LoadMore({
  page,
  perPage,
  onLoad,
  count,
  total,
  searchValue,
}: LoadMoreProps) {
  const [loading, setLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    setLoading(true);
    if (searchValue) {
      const result = (await pexelsClient.photos.search({
        query: searchValue,
        per_page: perPage,
        page: page + 1,
      })) as PhotosWithTotalResults;
      onLoad(result);
    } else {
      const result = (await pexelsClient.photos.curated({
        per_page: perPage,
        page: page + 1,
      })) as PhotosWithTotalResults;
      onLoad(result);
    }
    setLoading(false);
  }, [page, perPage, searchValue, onLoad]);

  return (
    <LoadMoreContainer>
      <p>
        Showing {count} out of {total}
      </p>
      <button onClick={handleLoadMore} disabled={loading || total <= count}>
        Load More...
      </button>
    </LoadMoreContainer>
  );
}

const LoadMoreContainer = styled.div`
  text-align: center;
`;
