<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // reuturn singular word or append 's' if plural

    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`

      return number === 1 ? text : text + 's'
    },
  },
}
</script>

<template>
  <div>
    <h1 class="text-2xl text-indigo-600">
      {{ home.title }}
    </h1>

    <div class="lg:grid-flow-col grid gap-8 mt-5 mb-12">
      <div>
        <img
          :src="home.images[0]"
          alt=""
          class="sm:max-h-96 md:max-h-[500px] object-fill w-full rounded-md"
        />
      </div>

      <div class="bg-slate-200 px-4 py-2 space-y-4 rounded-md shadow-md">
        <div class="flex justify-between">
          <h2 class="text-xl">Location</h2>
          <img
            src="/images/marker.svg"
            alt=""
            aria-hidden="true"
            width="20"
            height="20"
          />
        </div>

        <ul class="space-y-4">
          <li>
            <span class="font-bold">Address:</span>
            {{ home.location.address }}
          </li>

          <li>
            <span class="font-bold">City:</span>
            {{ home.location.city }}
          </li>

          <li>
            <span class="font-bold">Location:</span>
            {{ home.location.state }}
          </li>

          <div class="flex flex-wrap gap-2">
            <span class="font-bold">Home Details:</span>
            <li>{{ pluralize(home.guests, 'guest') }},</li>
            <li>{{ pluralize(home.bedrooms, 'room') }},</li>
            <li>{{ pluralize(home.beds, 'bed') }},</li>
            <li>{{ pluralize(home.bathrooms, 'bath') }}</li>
          </div>

          <li>
            <span class="font-bold">Price:</span>
            ${{ home.pricePerNight }} / night
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
