<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const analysis = useAnalysisStore();

const schema = z.object({
  requirementsText: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

const formState = reactive({
  requirementsText: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await analysis.analyse(event.data.requirementsText);
};
</script>

<template>
  <UCard variant="soft">
    <UForm
      class="space-y-4"
      :schema="schema"
      :state="formState"
      @submit="onSubmit"
    >
      <UFormField
        name="requirementsText"
        label="Requirements"
        description="Enter your Python requirements.txt file content."
        :ui="{ error: 'hidden' }"
        required
      >
        <UTextarea
          v-model="formState.requirementsText"
          variant="soft"
          :rows="10"
          class="w-full"
        />
      </UFormField>
      <UButton
        type="submit"
        size="xl"
        :disabled="analysis.state?.type === 'loading'"
      >
        Analyse
      </UButton>
    </UForm>
  </UCard>
</template>
