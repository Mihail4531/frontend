import { $axios } from "@/shared/api";
export interface ReportPayload {
  post_id: number;
  reason: string;
  details?: string;
}
export const reportApi = {
  sendReport: async (data: ReportPayload) => {
    return $axios.post("/reports", data);
  },
};