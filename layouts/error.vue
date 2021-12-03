<script>
export default {
  head() {
    return {
      title: `Error:(${this.error.statusCode})  `,
    }
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
// Todo style error page and add image
<template>
  <div class="bg-red-400">
    we have a problem {{ error.message }} {{ error.statusCode }}
  </div>
</template>
