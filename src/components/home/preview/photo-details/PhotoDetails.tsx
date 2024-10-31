import styled from "@emotion/styled";

type PhotoDetailsProps = {
  src: string;
  author?: string;
  title?: string;
};

export function PhotoDetails({ src, author, title }: PhotoDetailsProps) {
  return (
    <>
      <PhotoSource src={src} alt={title ?? ""} />
      {author && <PhotoDetail>Photographer: {author}</PhotoDetail>}
      {title && <PhotoDetail>Title: {title}</PhotoDetail>}
    </>
  );
}

const PhotoDetail = styled.div`
  padding: 5px 0;
`;

const PhotoSource = styled.img`
  max-width: 100%;
  align-self: center;
`;
