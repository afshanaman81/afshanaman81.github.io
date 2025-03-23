<template>
  <div class="flex flex-col justify-center items-center">
    <!-- Row 1: Left Aligned -->
    <div class="w-full text-left">
      <h1
        class="text-3xl md:text-5xl font-bold text-pop-secondary leading-tight"
      >
        <slot name="titleLeft" />
      </h1>

      <h2 class="text-lg md:text-2xl text-secondary/50">
        <slot name="subTitleLeft" />
      </h2>
    </div>

    <!-- Row 1: Center Aligned -->
    <div class="text-center">
      <h1
        class="text-3xl md:text-5xl font-bold text-pop-secondary leading-tight"
      >
        <slot name="titleCentered" />
      </h1>
    </div>

    <!-- Row 1: Right Aligned -->
    <div class="w-full text-right">
      <h1
        class="text-3xl md:text-5xl font-bold text-pop-secondary leading-tight"
      >
        <slot name="titleRight" />
      </h1>

      <h2 class="text-lg md:text-2xl text-secondary/50">
        <slot name="subTitleRight" />
      </h2>
    </div>

    <!-- Row 2 -->
    <div class="md:mx-44 mt-6 p-6 text-center text-secondary text-xl">
      <slot name="description" />
    </div>

    <!-- Row 3 -->
    <div class="">
      <slot name="content" />
    </div>
  </div>
</template>
