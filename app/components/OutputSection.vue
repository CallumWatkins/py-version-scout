<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { OutputProject } from "~~/types/output";


const analysis = useAnalysisStore();

const columns: TableColumn<OutputProject>[] = [
  {
    accessorKey: "name",
    header: "Project",
  },
];
</script>

<template>
  <UCard
    v-if="analysis.state !== null"
    variant="soft"
  >
    <UAlert
      v-if="analysis.state?.type === 'success' && analysis.state.result.skippedLines.length > 0"
      :title="`Skipped ${analysis.state.result.skippedLines.length} line${analysis.state.result.skippedLines.length === 1 ? '' : 's'}`"
      color="warning"
      variant="subtle"
      icon="i-lucide-info"
    />
    <UProgress v-if="analysis.state?.type === 'loading'" />
    <UTable
      v-else-if="analysis.state?.type === 'success'"
      :data="analysis.state.result.projects"
      :columns="columns"
    />
    <UAlert
      v-else-if="analysis.state?.type === 'error'"
      :title="analysis.state.error"
      color="error"
      variant="subtle"
      icon="i-lucide-alert-circle"
    />
  </UCard>
</template>
