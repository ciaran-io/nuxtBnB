<template>
  <section class="md:gap-[4rem_6rem] grid md:grid-cols-2 grid-cols-1 gap-y-12">
    <div
      v-for="(review, index) in reviews"
      :key="index"
      class="px-6 py-4 rounded-md shadow-md"
    >
      <div class="flex gap-6">
        <img
          :src="review.reviewer.image"
          alt=""
          class="self-start w-16 h-16 rounded-full"
        />

        <div class="mt-5">
          <p><shorten-text :text="review.comment" :target="120" /></p>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-8">
        <p class="text-sky-500">{{ review.reviewer.name }}</p>
        <p>{{ shortDate(review.date) }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import shortDate from '~/utils/shortDate'
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  methods: {
    shortDate,
  },
}
</script>
