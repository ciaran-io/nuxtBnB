<script>
export default {
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch)
  },
  methods: {
    changed(event) {
      const place = event.detail
      if (!place.geometry) return

      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value,
        },
      })
    },
  },
}
</script>

<template>
  <div>
    <header>
      <NuxtLink to="/">Home</NuxtLink>
      <input ref="citySearch" type="text" @changed="changed" />
    </header>
    <nuxt />
  </div>
</template>
