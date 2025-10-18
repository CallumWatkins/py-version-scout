import { defineStore } from "pinia";
import type { ProjectsResult } from "~~/types/output";

type AnalyseState
  = | { type: "loading" }
    | { type: "success"; result: ProjectsResult }
    | { type: "error"; error: string }
    | null;

export const useAnalysisStore = defineStore("analysis", {
  state: () => ({
    state: null as AnalyseState,
  }),
  actions: {
    async analyse(requirementsText: string) {
      this.state = { type: "loading" };
      try {
        const result = await processRequirements(requirementsText);
        this.state = { type: "success", result };
      }
      catch (e: unknown) {
        this.state = { type: "error", error: `${e}` };
      }
    },
    reset() {
      this.state = null;
    },
  },
});
