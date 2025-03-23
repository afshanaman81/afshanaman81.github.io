<template>
  <div class="mt-24">
    <RowLayout>
      <template #titleCentered> Meet Our Founding Team </template>

      <template #description>
        With expertise ranging from Startup Strategy, Data Science and Health,
        and Software Engineering, our Founding team is well positioned to
        realize this idea to its full potential.
      </template>

      <template #content>
        <ul
          role="list"
          class="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-24 px-4 pt-24 pb-12 rounded-md"
        >
          <li
            v-for="person in team"
            :key="person.email"
            class="flex flex-col p-2 divide-y divide-secondary rounded-md bg-pop-secondary shadow"
          >
            <UserProfile :user="person" />
          </li>
        </ul>
      </template>
    </RowLayout>
  </div>
</template>

<script setup lang="ts">
import UserProfile from "@/components/UserProfile.vue";
import RowLayout from "@/components/layout/widget/RowLayout.vue";

const team = [
  {
    name: "Jane Cooper",
    nickName: undefined,
    email: "janecooper@example.com",
    summary: "Over 15 years of industy experience in Startup advisory",
    picture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    nickName: undefined,
    email: "cody.fisher@example.com",
    summary:
      "A masters in Data Science from UCL, and 8+ years of experience in the Health Care industy ",
    picture:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    nickName: undefined,
    email: "esther.howard@example.com",
    summary:
      "A masters in Computer Science from RWTH, and 10+ years of experience in the Software Engineering, full-stack application development, Web2, Web3 and Web4",
    picture:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];
</script>
