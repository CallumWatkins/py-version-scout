<script setup lang="ts">
import { version } from "../package.json";
</script>

<template>
  <UApp>
    <UHeader
      to="/"
    >
      <template #title>
        <UIcon
          name="i-lucide-package"
          class="size-7"
        />
      </template>

      <template #right>
        <UColorModeButton />
        <UTooltip
          text="Open on GitHub"
        >
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/CallumWatkins/py-version-scout"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>
    </UHeader>
    <UMain>
      <NuxtPage />
    </UMain>
    <UFooter>
      <template #default>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }} <ULink
            href="https://www.callumwatkins.com"
            target="_blank"
          >Callum Watkins</ULink>
        </p>
      </template>

      <template #right>
        <p class="text-sm">
          <ULink
            href="https://github.com/CallumWatkins/py-version-scout"
            target="_blank"
            class="text-dimmed"
          >v{{ version }}</ULink>
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
