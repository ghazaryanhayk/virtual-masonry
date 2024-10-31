import { createClient } from "pexels";

export const HIGHEST_PER_PAGE_SIZE = 80;

export const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);
