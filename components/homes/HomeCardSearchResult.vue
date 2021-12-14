<script>
import pluralize from '~/utils/pluralize.js'
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  computed: {
    features() {
      return this.home.features.slice(0, 3).join(', ')
    },
  },
  methods: {
    pluralize,
  },
}
</script>

<template>
  <section class="mt-8">
    <div
      class="lg:grid-cols-[1fr,60%] h-52 rounded-tr-md rounded-bl-md rounded-br-md bg-slate-100 grid w-full"
    >
      <img
        :src="home.images[0]"
        alt=""
        class="rounded-tl-md rounded-bl-md object-cover object-[left_center] w-full h-full"
      />

      <div class="gap-y-1 grid p-4">
        <div class="flex flex-wrap items-center gap-2">
          <h2 class="font-bold">{{ home.title }}</h2>
          <img src="~/icons/heart.svg" alt="" />
        </div>

        <div class="flex items-center">
          <img
            src="/images/marker.svg"
            alt=""
            aria-hidden="true"
            width="10"
            height="10"
            class="mr-2"
          />
          <div class="text-blue-500 underline">
            {{ home.location.state }}
            {{ home.location.address }}
            {{ home.location.city }}
          </div>
        </div>

        <div
          class="text-slate-400 divide-slate-300 h-fit flex mt-2 space-x-1 text-sm divide-x-2"
        >
          <div class="px-2">{{ pluralize(home.guests, 'guest') }}</div>
          <div class="px-2">{{ pluralize(home.bedrooms, 'room') }}</div>
          <div class="px-2">{{ pluralize(home.beds, 'bed') }}</div>
          <div class="px-2">{{ pluralize(home.bathrooms, 'bath') }}</div>
        </div>

        <div class="text-slate-400 pl-2 text-sm">
          {{ features }}
        </div>

        <div class="flex items-center justify-between">
          <div class="flex gap-1">
            <img src="~/icons/star.svg" alt="" />
            <div>{{ home.reviewValue }}</div>
            <div class="text-slate-700">({{ home.reviewCount }})</div>
          </div>

          <div>
            ${{ home.pricePerNight }}
            <span class="text-slate-500">/ night</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
