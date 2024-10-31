import { useLoaderData } from "react-router-dom";
import { Photos } from "pexels";
import { VirtualMasonry } from "./masonry/VirtualMasonry.tsx";

export function Home() {
  const loaderData = useLoaderData() as Photos;

  return <VirtualMasonry photos={loaderData.photos} />;
}
