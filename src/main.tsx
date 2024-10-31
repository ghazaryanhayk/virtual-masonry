import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeLoader } from "./loaders/homeLoader.ts";
import { previewLoader } from "./loaders/previewLoader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        loader: homeLoader,
        async lazy() {
          const { Home: Component } = await import(
            "./components/home/Home.tsx"
          );
          return {
            Component,
          };
        },
        children: [
          {
            path: ":id",
            loader: previewLoader,
            async lazy() {
              const { Preview } = await import(
                "./components/home/preview/Preview.tsx"
              );
              return {
                Component: Preview,
              };
            },
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
