<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // call google maps api from maps plugin
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },
}
</script>

<template>
  <section>
    <div>
      <h2 class="heading">Location</h2>
      <p class="flex mt-8">
        {{ home.location.address }}
        {{ home.location.city }}
        {{ home.location.state }}
        {{ home.location.counrty }}
      </p>
    </div>
    <!-- google maps -->
    <div ref="map" class="w-full h-[450px] rounded-md"></div>
  </section>
</template>
