import { createClient } from "pexels";

export const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);
