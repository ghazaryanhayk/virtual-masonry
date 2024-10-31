import { createClient } from "pexels";

const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);

export default pexelsClient;
