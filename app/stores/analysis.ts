import { defineStore } from "pinia";
import type { OutputProject } from "~~/types/output";

type AnalyseState
  = | { type: "loading" }
    | { type: "success"; projects: OutputProject[] }
    | { type: "error"; error: string }
    | null;

export const useAnalysisStore = defineStore("analysis", {
  state: () => ({
    state: null as AnalyseState,
  }),
  actions: {
    async analyse(requirementsText: string) {
      console.log(requirementsText);
      this.state = { type: "loading" };
      try {
        const projects = await processRequirements(requirementsText);
        this.state = { type: "success", projects: projects };
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
