import { Link, useLoaderData } from "react-router-dom";
import styled from "@emotion/styled";
import { Photo } from "pexels";
import { PhotoDetails } from "./photo-details/PhotoDetails.tsx";

export function Preview() {
  const loaderData = useLoaderData() as Photo;

  return (
    <Modal>
      <ModalContent>
        <BackLink to="..">← Back</BackLink>
        <PhotoDetails
          src={loaderData.src.large}
          title={loaderData.alt ?? ""}
          author={loaderData.photographer}
        />
      </ModalContent>
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 10px;
`;

const BackLink = styled(Link)`
  padding: 5px 0;
`;
