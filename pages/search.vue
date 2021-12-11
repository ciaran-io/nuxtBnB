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
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        }
      })
    },

    highlightMarker(homeId, isHighlighted) {
      /* 
        uses es6 optional chaining operator to check if class exists
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      */
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle('marker-highlight', isHighlighted)
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
          <HomeCardSearchResult
            :home="home"
            @mouseover.native="highlightMarker(home.objectID, true)"
            @mouseout.native="highlightMarker(home.objectID, false)"
          />
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

<style lang="postcss">
.marker {
  @apply bg-white
       border
      border-gray-200
       px-3
      py-2
      rounded-xl
      font-bold;

  &-highlight {
    @apply bg-slate-800 border-black !text-white;
  }
}
</style>
