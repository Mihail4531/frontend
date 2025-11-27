import { $axios } from "@/shared/api";
import { Rule } from "../model/types";

export const ruleApi = {
  getAll: async (): Promise<Rule[]> => {
    const response = await $axios.get<{ data: Rule[] }>("/rules");
    return response.data.data;
  },
};