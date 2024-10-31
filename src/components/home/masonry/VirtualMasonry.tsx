import { useMemo, useRef, useState } from "react";
import type { Photo } from "pexels";
import styled from "@emotion/styled";
import {
  calculateMasonryItemCoordinates,
  COLUMN_WIDTH,
  THRESHOLD,
} from "./utils/masonry.ts";
import VirtualMasonryGridItem from "./VirtualMasonryGridItem.tsx";
import { useWindowWidth } from "../../../hooks/useWindowWidth.ts";
import { useDebouncedCallback } from "../../../hooks/useDebounceCallback.ts";
import { Outlet } from "react-router-dom";

export function VirtualMasonry({ photos }: { photos: Photo[] }) {
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
          {items.map((photo) => {
            const photoTop = photo.top;
            const photoBottom = photo.top + photo.height;

            const viewportTop = scrollPosition;
            const viewportBottom =
              scrollPosition + (wrapperRef.current?.clientHeight ?? 0);

            // hide item when it's not in viewport (including thresholds)
            if (
              photoBottom < viewportTop - THRESHOLD ||
              photoTop > viewportBottom + THRESHOLD
            ) {
              return null;
            }

            return (
              <VirtualMasonryGridItem
                key={photo.raw.id}
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
