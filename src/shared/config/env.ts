const BASE_DOMAIN = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
const CLEAN_DOMAIN = BASE_DOMAIN.replace(/\/$/, "");
export const API_URL = `${CLEAN_DOMAIN}/api`;