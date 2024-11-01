import { useMemo, useRef, useState } from "react";
import type { Photo } from "pexels";
import styled from "@emotion/styled";
import {
  calculateMasonryItemCoordinates,
  COLUMN_WIDTH,
  THRESHOLD,
} from "./utils/masonry.ts";
import { MasonryGridItem } from "./MasonryGridItem.tsx";
import { useWindowWidth } from "../../../hooks/useWindowWidth.ts";
import { useDebouncedCallback } from "../../../hooks/useDebounceCallback.ts";
import { Outlet } from "react-router-dom";

type MasonryProps = {
  photos: Photo[];
};

export function Masonry({ photos }: MasonryProps) {
  const windowSize = useWindowWidth();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollingAreaRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const { items, maxHeight } = useMemo(() => {
    const columnsCount = Math.floor(windowSize / COLUMN_WIDTH);
    return calculateMasonryItemCoordinates(photos, columnsCount);
  }, [photos, windowSize]);

  const handleDebounceScroll = useDebouncedCallback(
    (e: { target: HTMLDivElement }) => {
      setScrollPosition(e.target.scrollTop);
    },
    20,
  );

  if (!photos.length) {
    return <div>No results</div>;
  }

  return (
    <>
      <div
        ref={wrapperRef}
        onScroll={handleDebounceScroll}
        style={{ height: "80dvh", width: "100dvw", overflow: "auto" }}
      >
        <GridWrapper
          ref={scrollingAreaRef}
          style={{
            height: maxHeight,
            margin: "0 auto",
            width: Math.floor(windowSize / COLUMN_WIDTH) * COLUMN_WIDTH,
          }}
        >
          {items.map((photo, index) => {
            const photoTop = photo.top;
            const photoBottom = photo.top + photo.height;

            const viewportTop = scrollPosition;
            const viewportBottom =
              scrollPosition + (wrapperRef.current?.clientHeight ?? 0);

            // skip item when it's not in viewport (including thresholds)
            if (
              photoBottom < viewportTop - THRESHOLD ||
              photoTop > viewportBottom + THRESHOLD
            ) {
              return null;
            }

            return (
              <MasonryGridItem
                // index used as part of key as Pexels api may return the same
                // photo (with the same ID) in case of curated result multiple times
                key={`${photo.raw.id}_${index}`}
                id={photo.raw.id}
                src={photo.raw.src.medium}
                top={photo.top}
                left={photo.left}
                height={photo.height}
                width={photo.width}
                alt={photo.raw.alt ?? ""}
              />
            );
          })}
        </GridWrapper>
      </div>
      <Outlet />
    </>
  );
}

const GridWrapper = styled.div`
  position: relative;
`;
