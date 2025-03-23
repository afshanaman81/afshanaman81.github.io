<template>
  <div class="flex flex-col items-center">
    <TopNavigation @scroll:to="handleScroll" />

    <Hero />
    <Team ref="team" id="team" />
    <Problem ref="problem" id="problem" />
    <Solution ref="solution" id="solution" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import TopNavigation from "@/components/landing/TopNavigation.vue";
import Hero from "@/components/landing/Hero.vue";
import Team from "@/components/landing/Team.vue";
import Problem from "@/components/landing/Problem.vue";
import Solution from "@/components/landing/Solution.vue";


const team = ref(null);
const problem = ref(null);
const solution = ref(null);

const handleScroll = async (value) => {
  console.log("scrolling to", value);

  team.value = document.getElementById("team");
  problem.value = document.getElementById("problem");
  solution.value = document.getElementById("solution");

  await nextTick();
  if (value === "team") {
    team.value?.scrollIntoView({ behavior: "smooth" });
  } else if (value === "problem") {
    problem.value?.scrollIntoView({ behavior: "smooth" });
  } else if (value === "solution") {
    solution.value?.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
