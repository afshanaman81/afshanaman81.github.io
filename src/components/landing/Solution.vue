<template>
  <div class="mt-24">
    <RowLayout>
      <template #titleRight> The Solution </template>

      <template #subTitleRight>
        SiloLabs: Empowering Cancer Patients to Monetize Their Data
      </template>

      <template #description>
        SiloLabs bridges traditional and decentralized finance, creating a fair,
        patient-first data economy leveraging blockchain technology so those in
        need finally benefit from the data they create.
      </template>

      <template #content>
        <ul
          role="list"
          class="grid grid-cols-1 md:grid-cols-4 gap-x-2 rounded-md"
        >
          <li
            v-for="item in items"
            class="flex flex-col p-2 divide-y divide-secondary rounded-md shadow bg-pop-secondary"
          >
            <SolutionCard :item="item" />
          </li>
        </ul>
      </template>
    </RowLayout>
  </div>
</template>

<script setup lang="ts">
import SolutionCard from "./SolutionCard.vue";
import RowLayout from "@/components/layout/widget/RowLayout.vue";

const items = [
  {
    title: "Patients Get Paid",
    description:
      "Cancer patients receive direct payments for their anonymized health data.",
    icon: "fa-solid fa-piggy-bank",
  },
  {
    title: "Seamless Payments",
    description:
      "Life Sciences companies pay traditionally; SiloLabs converts funds into stablecoins (USDC) for secure, automated micropayments.",
    icon: "fa-solid fa-building-columns",
  },
  {
    title: "Ethical & Transparent",
    description:
      "Blockchain ensures patient consent, security, and full traceability.",
    icon: "fa-solid fa-cubes",
  },
  {
    title: "Better Data for Research",
    description:
      "Life Sciences companies access verified, high-quality patient data to accelerate new treatments.",
    icon: "fa-solid fa-clipboard-list",
  },
];
</script>
