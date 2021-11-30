<script>
import homes from '~/data/homes'

export default {
  head: () => ({
    title: 'Homepage',
    meta: [
      {
        name: 'decription',
        content: 'This is a homepage',
        hid: 'decription',
      },
    ],
  }),

  data: () => ({
    home: {},
  }),
  created() {
    const home = homes.find((home) => home.objectID == this.$route.params.id)
    this.home = home
  },
}
</script>

<template>
  <div>
    <div class="flex">
      <!-- home images -->
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        alt="interior and exterior of home"
        width="200"
        height="150"
      />
    </div>

    <!-- home information -->
    <div class="mt-4">
      <h2>{{ home.title }}</h2>

      <ul class="mt-6">
        <li>
          <span>${{ home.pricePerNight }}</span>
          / night
        </li>

        <div class="flex gap-2 mt-6">
          <img
            src="/images/marker.svg"
            alt=""
            aria-hidden="true"
            width="20"
            height="20"
          />
          <li>{{ home.location.address }}</li>
          <li>{{ home.location.city }}</li>
          <li>{{ home.location.state }}</li>
          <li>{{ home.location.country }}</li>
        </div>

        <div class="flex gap-2 mt-6">
          <img
            src="/images/star.svg"
            alt=""
            aria-hidden="true"
            width="20"
            height="20"
          />
          <li>{{ home.reviewValue }}</li>
        </div>

        <div class="flex gap-2 mt-6">
          <li>{{ home.guests }} guests,</li>
          <li>{{ home.bedrooms }} rooms,</li>
          <li>{{ home.beds }} beds,</li>
          <li>{{ home.bathrooms }} bathrooms,</li>
        </div>
      </ul>
    </div>
  </div>
</template>
