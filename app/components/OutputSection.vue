<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { OutputProject } from "~~/types/output";


const analysis = useAnalysisStore();

const columns: TableColumn<OutputProject>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
</script>

<template>
  <UCard
    v-if="analysis.state !== null"
    variant="soft"
  >
    <UProgress v-if="analysis.state?.type === 'loading'" />
    <UTable
      v-else-if="analysis.state?.type === 'success'"
      :data="analysis.state.projects"
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
