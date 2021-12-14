<script>
export default {}
</script>

<template>
  <button type="button">
    <slot></slot>
  </button>
</template>

<style lang="postcss">
.button {
  @apply rounded-md h-fit;

  &-default {
    background-color: var(--nuxtBnB-gray-300);
    @apply text-gray-600 px-1 py-2;
  }

  &-booking {
    background-color: var(--nuxtBnB-blue-primary);
    @apply text-gray-100 px-1 py-4;
  }

  &-search {
    background-color: var(--nuxtBnB-blue-primary);
    @apply p-3;
  }
}
</style>
