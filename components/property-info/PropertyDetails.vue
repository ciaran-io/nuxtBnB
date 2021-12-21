<script>
import pluralize from '~/utils/pluralize.js'
export default {
  name: 'PropertyDetials',
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize,
  },
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
      <div class="grid grid-cols-2 gap-2">
        <input type="text" placeholder="Check in" class="datepicker" />
        <input type="text" placeholder="Check out" class="datepicker" />
      </div>
      <BaseButton class="button button-booking shadow-xl"
        >Request to book!</BaseButton
      >
    </div>
  </section>
</template>
