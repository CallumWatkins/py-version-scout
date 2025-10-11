<template>
  <UPageCard variant="soft">
    <UForm class="space-y-4">
      <UFormField
        label="Requirements"
        description="Enter your Python requirements.txt file content."
        required
      >
        <UTextarea
          :rows="10"
          class="w-full"
        />
      </UFormField>
      <UButton
        type="submit"
        size="xl"
      >
        Analyse
      </UButton>
    </UForm>
  </UPageCard>
</template>
