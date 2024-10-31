import { Photo } from "pexels";

export const COLUMN_WIDTH = 300;
export const THRESHOLD = 300;

type MasonryItemDetails = {
  width: number;
  height: number;
  top: number;
  left: number;
  raw: Photo;
};

export function calculateMasonryItemCoordinates(
  photos: Photo[],
  columnsCount: number,
): { items: MasonryItemDetails[]; maxHeight: number } {
  if (!columnsCount) {
    return {
      items: [],
      maxHeight: 0,
    };
  }

  const columnsBottom = new Array(columnsCount).fill(0);
  const result: MasonryItemDetails[] = [];

  photos.forEach((photo) => {
    const itemHeight = (photo.height / photo.width) * COLUMN_WIDTH;
    const nextColumn = columnsBottom.indexOf(Math.min(...columnsBottom));

    const item: MasonryItemDetails = {
      top: columnsBottom[nextColumn],
      left: nextColumn * COLUMN_WIDTH,
      height: itemHeight,
      width: COLUMN_WIDTH,
      raw: photo,
    };

    columnsBottom[nextColumn] += itemHeight;

    result.push(item);
  });

  const maxHeight = Math.max(...columnsBottom);

  return { items: result, maxHeight };
}
