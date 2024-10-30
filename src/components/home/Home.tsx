import { useLoaderData } from "react-router-dom";
import type { Photos } from "pexels";
import VirtualMasonry from "./masonry/VirtualMasonry.tsx";

export default function Home() {
  const loaderData = useLoaderData() as Photos;

  return <VirtualMasonry photos={loaderData.photos} />;
}
