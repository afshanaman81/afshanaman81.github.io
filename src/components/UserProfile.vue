<template>
  <div
    class="flex flex-col h-full items-center text-secondary bg-primary rounded-md"
  >
    <div
      class="-mt-20 border-8 rounded-full overflow-hidden border-pop-secondary"
    >
      <img
        v-if="user.picture"
        :src="user.picture"
        alt="Profile Image"
        class="w-full h-full object-cover"
      />
    </div>

    <h2 class="mt-4 text-xl font-semibold text-pop-primary">{{ user.name }}</h2>
    <p
      class="mt-1 py-1 px-2 text-sm text-pop-secondary bg-primary/70 rounded-full"
    >
      {{ user.email }}
    </p>
    <div
      class="w-3/4 h-full mt-4 mb-12 text-center space-y-1 border-pop-primary border-t-2"
    >
      <div v-if="user.summary" class="mt-6 text-secondary">
        {{ user.summary }}
      </div>

      <div v-else class="mt-6 text-secondary">
        <p>@{{ user.nickname }} | 29 | Fr</p>
        <p>WCIF friendly</p>
        <p v-if="user['sam.co/roles']">
          <span class="text-pop-primary">Roles: </span>
          {{ user["sam.co/roles"] }}
        </p>
      </div>
    </div>

    <div
      class="flex w-full mt-4 p-4 justify-around text-pop-primary border-pop-primary border-t-2"
    >
      <button class="hover:text-pop-primary">
        <i class="fas fa-envelope text-2xl"></i>
      </button>
      <button class="hover:text-pop-primary">
        <i class="fab fa-linkedin text-2xl"></i>
      </button>
      <button class="hover:text-pop-primary">
        <i class="fas fa-phone text-2xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  user: any;
}>();
</script>
