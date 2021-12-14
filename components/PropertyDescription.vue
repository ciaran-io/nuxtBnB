<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <section class="bg-blue-100/25">
    <div
      class="grid md:grid-cols-[60%,calc(40%-1.5rem)] mt-16 gap-6 content-wrapper-body mx-auto py-16 px-4"
    >
      <div class="border-slate-400 pr-8 border-r border-dotted">
        <h2 class="text-slate-500 text-2xl">Description</h2>
        <p class="mt-12">
          {{ home.description }}
        </p>
      </div>

      <ul
        class="text-slate-600 flex flex-wrap gap-[0.5rem_0.3rem] text-sm self-start"
      >
        <li
          v-for="(feature, index) in home.features"
          :key="index"
          class="h-fit w-max px-3 py-2 bg-blue-100 rounded-md"
        >
          {{ feature }}
        </li>
      </ul>
    </div>
  </section>
</template>
