<script>
import pluralize from '~/utils/pluralize.js'
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.$route.query.result == 'success') alert('success!')
  },
  methods: {
    pluralize,
    checkout() {
      const start = this.range.start.getTime() / 1000
      const end = this.range.end.getTime() / 1000
      this.$stripe.checkout(this.home.objectID, start, end)
    },
  },
  data: () => ({
    range: {
      start: null,
      end: null,
    },
  }),
}
</script>

<template>
  <section class="grid grid-rows-[400px,1fr] md:grid-cols-[60%,auto] gap-6">
    <div
      class="grid grid-rows-[50px,100px,100px] pr-8 border-slate-400 border-r border-dotted"
    >
      <h1 class="text-slate-500 text-3xl">
        {{ home.title }}
      </h1>

      <div
        class="border-slate-400 flex items-center justify-between border-b border-dotted"
      >
        <div class="flex gap-1">
          <img
            src="~/images/marker.svg"
            alt=""
            aria-hidden="true"
            class="w-6 h-6"
          />

          <div
            class="decoration-solid decoration-blue-500 text-blue-500 underline"
          >
            {{ home.location.address }}
            {{ home.location.city }}
            {{ home.location.state }}
            {{ home.location.counrty }}
          </div>
        </div>

        <div class="flex items-center gap-1">
          <img
            src="~/images/star.svg"
            alt=""
            aria-hidden="true"
            class="w-3 h-3"
          />

          {{ home.reviewValue }}
          <span class="text-slate-500">({{ home.reviewCount }})</span>
        </div>
      </div>

      <div class="text-slate-500 self-center text-lg">
        <div>
          {{ pluralize(home.guests, 'guest') }} &middot;
          {{ pluralize(home.bedrooms, 'room') }} &middot;
          {{ pluralize(home.beds, 'bed') }} &middot;
          {{ pluralize(home.bathrooms, 'bath') }}
        </div>
      </div>
    </div>

    <div class="grid gap-3">
      <div class="text-primary-blue text-2xl">
        ${{ home.pricePerNight }}
        <span class="text-slate-500 text-lg"> / night</span>
      </div>

      <client-only>
        <date-picker
          v-model="range"
          is-range
          timezone="UTC"
          :model-config="{ timeAdjust: '00.00.00' }"
          class="md:flex"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              :value="inputValue.start"
              v-on="inputEvents.start"
              class="datepicker"
            />

            <input
              :value="inputValue.end"
              v-on="inputEvents.end"
              class="datepicker"
            />

            <button class="submit ml-2" @click="checkout">
              <img src="~/icons/search.svg" alt="" class="w-4 h-full" />
            </button>
          </template>
        </date-picker>
      </client-only>
    </div>
  </section>
</template>
