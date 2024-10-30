import { Photo } from "pexels";

export const COLUMN_WIDTH = 300;
export const THRESHOLD = 600;

type MasonryItemDetails = {
  width: number;
  height: number;
  top: number;
  left: number;
  src: string;
  raw: Photo;
};

export function calculateMasonryItemCoordinates(
  photos: Photo[],
  columnsCount: number,
): { items: MasonryItemDetails[]; maxHeight: number } {
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
      src: "",
      raw: photo,
    };

    columnsBottom[nextColumn] += itemHeight;

    result.push(item);
  });

  const maxHeight = Math.max(...columnsBottom);

  return { items: result, maxHeight };
}
