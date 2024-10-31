import styled from "@emotion/styled";

type MasonryGridItemProps = {
  id: number;
  height: number;
  width: number;
  left: number;
  top: number;
  src: string;
  alt?: string;
};

export default function VirtualMasonryGridItem({
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
      <img src={src} alt={alt ?? ""} title={alt ?? ""} />
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
