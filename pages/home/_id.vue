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

  methods: {},
}
</script>

<template>
  <div>
    <!-- property images -->
    <PropertyGallery :images="home.images" />

    <!-- property information -->
    <PropertyDetails :home="home" />

    <!-- property description -->
    <PropertyDescription :home="home" />

    <!-- Google maps + address -->
    <PropertyMap :home="home" />

    <!-- property reviews -->
    <PropertyReviews :reviews="reviews" />

    <!-- property host -->
    <PropertyHost :user="user" />
  </div>
</template>

<style lang="postcss" scoped>
/* div > section
} */
div > section {
  @apply mx-auto;

  &:nth-child(3n),
  :nth-child(6n) {
    @apply max-w-screen-xl;
  }

  &:not(:nth-child(3n)):not(:nth-child(6n)) {
    @apply max-w-screen-lg;
  }

  &:nth-child(1) {
    @apply mt-[var(--gutter-default-top)];
  }

  &:nth-child(2) {
    @apply mt-20;
  }

  &:nth-child(3) {
    @apply mt-20;
  }

  &:nth-child(4) {
    @apply mt-24;
  }

  &:nth-child(5) {
    @apply mt-24;
  }

  &:nth-child(6) {
    @apply mt-24;
  }
}
</style>
