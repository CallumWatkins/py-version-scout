<script setup lang="ts">
import type { PyPIResponse } from "@@/types/pypi";

const dependencies = ref<PyPIResponse[]>([
]);
</script>

<template>
  <UContainer class="space-y-4">
    <UPageHeader
      title="Python Version Scout"
      description="A utility for auditing Python dependency versions at a glance."
    />
    <InputSection />
    <OutputSection
      :dependencies="dependencies"
    />
  </UContainer>
</template>
