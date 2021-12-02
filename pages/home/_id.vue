<script>
export default {
  head() {
    return {
      title: this.home.title,
      meta: [
        {
          name: 'description',
          content: `This is a new home ${this.home.title}`,
          hid: 'description',
        },
      ],
    }
  },

  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },

  // call data api useing dataApi plugin
  async asyncData({ params, $dataApi, error }) {
    const repsonse = await $dataApi.getHome(params.id)
    if (!repsonse.ok)
      return error({
        statuscode: response.status,
        messsage: response.statusText,
      })
    return { home: repsonse.home }
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

    <!-- google maps -->
    <div ref="map" class="w-[800px] h-[800px]"></div>
  </div>
</template>
