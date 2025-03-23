<template>
  <!-- the X value needs to match b/w the lg:w-X of the side column and the lg:pl-X of the main column -->

  <!-- Main Column  -->
  <div
    class="flex flex-col h-screen justify-between"
  >
 
    <main
      class="mb-auto mx-auto w-full py-10 px-4 sm:px-6 lg:px-44 overflow-auto scrollbar"
    >
      <router-view />
    </main>

    <div class="sticky border-t-2 z-40 mx-8 border-pop-secondary">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";
</script>
