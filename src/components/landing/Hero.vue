<template>
  <div class="mt-24">
    <ColumnLayout>
      <template #title>
        Explore the new personal assistant, workflows, and AI Agents
      </template>

      <template #subTitle>
        <div class="flex space-x-12 text-pop-primary">
          <i
            class="fa-brands fa-galactic-senate text-6xl hover:text-pop-secondary"
          ></i>
          <i class="fa-brands fa-fulcrum text-6xl hover:text-pop-secondary"></i>
          <i
            class="fa-brands fa-swift text-6xl hover:text-pop-secondary hidden lg:flex"
          ></i>
          <i
            class="fa-brands fa-studiovinari text-6xl hover:text-pop-secondary"
          ></i>
          <i
            class="fa-brands fa-yammer text-6xl hover:text-pop-secondary hidden lg:flex"
          ></i>
          <i class="fa-brands fa-napster text-6xl hover:text-pop-secondary"></i>
          <i
            class="fa-brands fa-suse text-6xl hover:text-pop-secondary hidden lg:flex"
          ></i>
        </div>
      </template>

      <template #description>
        Our AI tools can help you run your business more efficiently and with
        peace of mind
      </template>

      <template #leftContent>
        <button
          class="px-6 py-3 rounded-lg text-lg font-semibold bg-pop-secondary/50 hover:bg-pop-primary text-secondary hover:text-primary transition shadow-lg"
        >
          GET STARTED
        </button>
        <div class="mt-5">
          <p class="text-pop-primary mb-2">
            Trusted by 10+ individuals and SMEs worldwide
          </p>
        </div>
      </template>

      <template #rightContent>
        <img src="/logo.png" alt="logo" class="w-full rounded-full" />
      </template>
    </ColumnLayout>
  </div>
</template>

<script setup lang="ts">
import ColumnLayout from "@/components/layout/widget/ColumnLayout.vue";
</script>
