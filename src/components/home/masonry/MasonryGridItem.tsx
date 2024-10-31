import styled from "@emotion/styled";
import { Link } from "react-router-dom";

type MasonryGridItemProps = {
  id: number;
  height: number;
  width: number;
  left: number;
  top: number;
  src: string;
  alt?: string;
};

export function MasonryGridItem({
  id,
  src,
  top,
  left,
  height,
  width,
  alt,
}: MasonryGridItemProps) {
  return (
    <GridItem
      style={{ height, width, transform: `translate(${left}px, ${top}px)` }}
    >
      <Link to={`${id}`} key={id} aria-label={`${id} - ${alt}`}>
        <img
          src={src}
          alt={alt ?? ""}
          title={alt ?? ""}
          height={height}
          width={width}
        />
      </Link>
    </GridItem>
  );
}

const GridItem = styled("div")`
  position: absolute;
  box-sizing: border-box;
  left: 0;
  top: 0;
  margin: 0;

  & img {
    width: 100%;
  }
`;
