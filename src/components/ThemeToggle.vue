<template>
  <div @click="toggleDark()" class="flow-root">
    <p class="float-left mr-4">
      <component
        v-if="is_dark"
        :is="MoonIcon"
        class="w-6 shrink-0 text-pop-secondary"
        aria-hidden="true"
      />
      <component
        v-if="!is_dark"
        :is="SunIcon"
        class="w-6 shrink-0 text-pop-secondary"
        aria-hidden="true"
      />
    </p>
    <p class="float-right pt-1 text-pop-secondary">
      {{ is_dark ? "Go Light" : "Go Dark" }} Theme
    </p>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

const is_dark = useDark();
const toggleDark = useToggle(is_dark);
</script>
