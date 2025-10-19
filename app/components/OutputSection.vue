<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { OutputProject } from "~~/types/output";

const analysis = useAnalysisStore();

const columns: TableColumn<OutputProject>[] = [
  {
    accessorKey: "name",
    header: "Project",
  },
  {
    id: "status",
    header: "Status",
  },
];
</script>

<template>
  <UCard
    v-if="analysis.state !== null"
    variant="soft"
    :ui="{ body: 'space-y-4' }"
  >
    <UCollapsible
      v-if="analysis.state?.type === 'success' && analysis.state.result.skippedLines.length > 0"
    >
      <template #default="{ open }">
        <UAlert
          :title="`Skipped ${analysis.state.result.skippedLines.length} line${analysis.state.result.skippedLines.length === 1 ? '' : 's'}`"
          color="warning"
          variant="subtle"
          icon="i-lucide-info"
          close
          class="cursor-pointer"
        >
          <template #close>
            <UIcon
              :class="['transition-transform duration-200', open ? 'rotate-180' : 'rotate-0']"
              name="i-lucide-chevron-down"
              class="size-5"
            />
          </template>
        </UAlert>
      </template>
      <template #content>
        <UCard
          variant="soft"
          class="mt-2 bg-warning/5"
        >
          <div class="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 font-mono text-sm">
            <div
              v-for="skipped in analysis.state.result.skippedLines"
              :key="skipped.line"
              class="contents"
            >
              <span class="text-gray-500 dark:text-gray-400 text-right tabular-nums">{{ skipped.line }}</span>
              <span class="text-gray-700 dark:text-gray-300 min-w-0 wrap-break-word">{{ skipped.content }}</span>
            </div>
          </div>
        </UCard>
      </template>
    </UCollapsible>
    <UProgress v-if="analysis.state?.type === 'loading'" />
    <UTable
      v-else-if="analysis.state?.type === 'success'"
      :data="analysis.state.result.projects"
      :columns="columns"
      :ui="{ base: 'min-w-auto' }"
    >
      <template #status-cell="{ row }">
        <UBadge
          v-if="row.original.type === 'not-found'"
          class="capitalize"
          variant="subtle"
          color="error"
        >
          Not found
        </UBadge>
        <UBadge
          v-else-if="row.original.status === 'up-to-date'"
          class="capitalize"
          variant="subtle"
          color="success"
        >
          Up to date
        </UBadge>
        <UBadge
          v-else-if="row.original.status === 'outdated'"
          class="capitalize"
          variant="subtle"
          color="warning"
        >
          Outdated
        </UBadge>
        <UBadge
          v-else-if="row.original.status === 'unpinned'"
          class="capitalize"
          variant="subtle"
          color="error"
        >
          Unpinned
        </UBadge>
        <UTooltip
          v-else-if="row.original.status === 'yanked'"
          :text="row.original.yankedReason ?? undefined"
        >
          <UBadge
            class="capitalize"
            variant="subtle"
            color="error"
          >
            Yanked
          </UBadge>
        </UTooltip>
        <UBadge
          v-else-if="row.original.status === 'release-not-found'"
          class="capitalize"
          variant="subtle"
          color="error"
        >
          Release not found
        </UBadge>
      </template>
    </UTable>
    <UAlert
      v-else-if="analysis.state?.type === 'error'"
      :title="analysis.state.error"
      color="error"
      variant="subtle"
      icon="i-lucide-alert-circle"
    />
  </UCard>
</template>
