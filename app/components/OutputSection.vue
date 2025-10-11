<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { PyPIResponse } from "@@/types/pypi";

interface OutputSectionProps {
  dependencies: PyPIResponse[];
}

const props = defineProps<OutputSectionProps>();

const columns: TableColumn<PyPIResponse>[] = [
  {
    accessorKey: "info.name",
    header: "Name",
  },
];
</script>

<template>
  <UPageCard variant="soft">
    <template #body>
      <UTable
        :data="dependencies"
        :columns="columns"
      />
    </template>
  </UPageCard>
</template>
