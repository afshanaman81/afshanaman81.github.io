<template>
  <!-- Navigation Bar -->
  <nav
    class="w-full p-2 flex items-center justify-between border-b border-pop-secondary"
  >
    <!-- Logo -->
    <div class="flex items-center">
      <img src="/logo.png" alt="logo" class="w-20 object-cover rounded-full" />
    </div>

    <!-- Navigation Links (Hidden on Small Screens) -->
    <div class="hidden md:flex space-x-8 text-pop-secondary font-medium">
      <div v-for="item in navigation" :key="item.name">
        <a
          href="#"
          @click="emitAction(item.action)"
          class="hover:text-pop-primary transition"
        >
          {{ item.name }}
        </a>
      </div>

      <ThemeToggle class="ml-24" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Events } from "@/helpers/index";
import ThemeToggle from "@/components/ThemeToggle.vue";

const emit = defineEmits([Events.SCROLL_TO]);
const emitAction = (value: string) => {
  console.log("emiting", value);
  emit(Events.SCROLL_TO, value);
};

const navigation = [
  { name: "About", action: "about" },
  { name: "Team", action: "team" },
  { name: "Problem", action: "problem" },
  { name: "Solution", action: "solution" },
  { name: "Contact", action: "contact" },
];
</script>
