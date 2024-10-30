import type { Photo } from "pexels";
import styled from "@emotion/styled";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  calculateMasonryItemCoordinates,
  COLUMN_WIDTH,
  THRESHOLD,
} from "./utils/masonry.ts";
import debounce from "lodash.debounce";
import useWindowWidth from "../../../hooks/useWindowWidth.ts";
import MasonryGridItem from "./MasonryGridItem.tsx";

export default function VirtualMasonry({ photos }: { photos: Photo[] }) {
  const windowSize = useWindowWidth();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollingAreaRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const { items, maxHeight } = useMemo(() => {
    const columnsCount = Math.floor(windowSize / COLUMN_WIDTH);
    return calculateMasonryItemCoordinates(photos, columnsCount);
  }, [photos, windowSize]);

  const handleScroll = useCallback(
    debounce((e) => {
      setScrollPosition(e.target.scrollTop);
    }, 50),
    [],
  );

  return (
    <div
      ref={wrapperRef}
      onScroll={handleScroll}
      style={{ height: "100vh", width: "100vw", overflow: "auto" }}
    >
      <GridWrapper
        ref={scrollingAreaRef}
        style={{
          height: maxHeight,
          margin: "0 auto",
          width: Math.floor(windowSize / 300) * 300,
        }}
      >
        {items.map((photo) => {
          if (
            photo.top + THRESHOLD < scrollPosition ||
            photo.top + photo.height - THRESHOLD >
              scrollPosition + (wrapperRef.current?.clientHeight ?? 0)
          ) {
            return null;
          }

          return (
            <MasonryGridItem
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
  );
}

const GridWrapper = styled.div`
  position: relative;
`;
