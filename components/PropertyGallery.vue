<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <section>
    <div
      v-for="image in images"
      :key="image"
      :style="`background-image: url(${image})`"
    ></div>
  </section>
</template>

<style lang="postcss" scoped>
section {
  @apply grid grid-cols-4 grid-rows-[225px,225px] gap-6;

  > div {
    @apply bg-cover;

    &:nth-child(1) {
      @apply /* Grid column start end short hand */
       col-[1/3]
       row-[1/3]
       rounded-l-3xl;
    }

    &:nth-child(2) {
      @apply col-[3/4];
    }

    &:nth-child(3) {
      @apply col-[4/5]
      rounded-tr-3xl;
    }

    &:nth-child(4) {
      @apply col-[3/4]
        row-[2/3];
    }

    &:nth-child(5) {
      @apply col-[4/5]
        row-[2/3]
       rounded-br-3xl;
    }
  }
}
</style>
