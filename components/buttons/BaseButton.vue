<script>
export default {}
</script>

<template>
  <button type="button" class="button button_default">
    <slot></slot>
  </button>
</template>

<style lang="postcss">
.button {
  @apply px-1 py-2 text-gray-600 rounded-md;

  &_default {
    background-color: var(--nuxtBnB-gray-300);
  }
}
</style>
