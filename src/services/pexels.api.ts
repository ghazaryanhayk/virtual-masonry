import { createClient } from "pexels";

export const HIGHEST_PER_PAGE_SIZE = 80;

if (!import.meta.env.VITE_PEXELS_API_KEY) {
  alert("Environment variable is missing: VITE_PEXELS_API_KEY");
}

export const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);
