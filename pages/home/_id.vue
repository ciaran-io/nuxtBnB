<script>
export default {
  name: 'DynamicHomePage',
  // call algolia api useing dataApi plugin
  async asyncData({ params, $dataApi, error }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ])

    const badResponse = responses.find((response) => !response.ok)
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      })

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    }
  },

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
    // call google maps api from maps plugin
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },
  methods: {
    // format date received from api
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    },
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
    <div ref="map" class="w-[300px] h-[300px]"></div>

    <!-- home reviews -->
    <div v-for="review in reviews" :key="review.objectID" class="">
      <img :src="review.reviewer.image" alt="reviewer profile image" />
      <p>{{ review.reviewer.name }}</p>
      <p>{{ formatDate(review.date) }}</p>
      <p><shorten-text :text="review.comment" :target="120" /></p>
    </div>

    <div>
      <!-- user reviews -->
      <img :src="user.image" alt="" />
      <p>{{ user.name }}</p>
      <p>{{ formatDate(user.joined) }}</p>
      <p>{{ user.reviewCount }}</p>
      <p>{{ user.description }}</p>
    </div>
  </div>
</template>
