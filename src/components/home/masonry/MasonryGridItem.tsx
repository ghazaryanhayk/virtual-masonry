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

export default function MasonryGridItem({
  id,
  src,
  top,
  left,
  height,
  width,
  alt,
}: MasonryGridItemProps) {
  return (
    <GridItem key={id} h={height} w={width} l={left} t={top}>
      <img src={src} alt={alt ?? ""} style={{ width: "100%" }} />
    </GridItem>
  );
}

const GridItem = styled("div")<{ h: number; w: number; l: number; t: number }>`
  position: absolute;
  box-sizing: border-box;
  left: 0;
  top: 0;
  margin: 0;
  height: ${(props) => props.h}px;
  width: ${(props) => props.w}px;
  transform: translate(${(props) => props.l}px, ${(props) => props.t}px);
`;
