import { cookies } from "next/headers";
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    return accessToken ? { Cookie: `accessToken=${accessToken}` } : {};
  } catch (err) {
    console.error("Error getting auth headers:", err);
    return {};
  }
};