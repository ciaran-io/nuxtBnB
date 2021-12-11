<script>
export default {
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng
    )
    this.homes = data.json.hits
    this.label = to.query.label
    this.lat = to.query.lat
    this.lng = to.query.lng
    this.updateMap()
    next()
  },

  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng)

    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    }
  },

  head() {
    return {
      title: `Homes around ${this.label}`,
    }
  },

  mounted() {
    this.updateMap()
  },

  methods: {
    updateMap() {
      this.$maps.showMap(
        this.$refs.map,
        this.lat,
        this.lng,
        this.getHomeMarkers()
      )
    },

    getHomeMarkers() {
      return this.homes.map((home) => {
        return { ...home._geoloc }
      })
    },
  },
}
</script>

<template>
  <div
    class="md:grid-cols-[2fr,1fr] gutter grid gap-12 mt-[var(--gutter-default-top)] content-wrapper"
  >
    <div>
      <h1>Results found for {{ label }}</h1>

      <div v-if="homes.length > 0" class="mt-16">
        <NuxtLink
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <HomeCardSearchResult :home="home" />
        </NuxtLink>
      </div>

      <div v-else>
        <h1>Oops! looks like there no match for this.</h1>
      </div>
    </div>

    <!-- google maps -->
    <div ref="map" class="rounded-md h-[500px] mt-20"></div>
  </div>
</template>
