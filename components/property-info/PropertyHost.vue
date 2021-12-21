<script>
import shortDate from '~/utils/shortDate'
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    shortDate,
  },
}
</script>

<template>
  <section class="px-4 py-16 bg-gray-100">
    <div class="content-wrapper-body flex gap-4 mx-auto">
      <img :src="user.image" alt="" class="rounded-md" />

      <div class="">
        <span class="text-slate-600 block font-bold">{{ user.name }}</span>
        <span class="text-slate-400"
          >Joined in {{ shortDate(user.joined) }}</span
        >

        <div class="h-3/4 flex items-center gap-1 mt-auto">
          <img src="~/icons/star-blue.svg" alt="" class="w-4 h-4" />
          <p class="review">{{ user.reviewCount }} reviews</p>
        </div>
      </div>
    </div>

    <p class="content-wrapper-body mx-auto mt-6">{{ user.description }}</p>
  </section>
</template>

<style lang="postcss" scoped>
/* .review::before {
  background-image: url('~assets/images/icons/house-blue.svg');
  content: '';
  @apply w-8 h-8 bg-contain;
} */
</style>
