<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
  },

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
    <header
      class="gutter content-wrapper content-wrapper-header md:grid-rows-2 mt:mt-6 md:grid-cols-[1fr,auto] grid mt-3 grid-cols-[1fr,auto] items-end md:gap-y-6"
    >
      <NuxtLink to="/" class="w-max place-self-center">
        <img src="~/images/logo.svg" alt="" class="w-auto h-10" />
      </NuxtLink>

      <div class="md:flex md:items-center hidden">
        <template v-if="isLoggedIn">
          <img
            src="~/icons/house.svg"
            alt=""
            class="w-6 h-6 mr-2 text-blue-500"
          />
          <span class="mr-6 text-sm"> Host </span>
          <img :src="user.profileUrl" alt="" class="avatar" />
        </template>
        <div v-show="!isLoggedIn" id="googleButton">Button</div>
      </div>

      <div class="md:flex md:space-x-4 md:place-self-center hidden">
        <input
          ref="citySearch"
          type="text"
          placeholder="Enter your address"
          @changed="changed"
        />
        <input type="text" placeholder="Check in" class="datepicker" />
        <input type="text" placeholder="Check out" class="datepicker" />
        <BaseButton class="button button-search shadow-md">
          <img src="~/icons/search.svg" alt="" class="w-16 h-full" />
        </BaseButton>
      </div>
    </header>
    <nuxt class="gutter" />
  </div>
</template>

<style lang="postcss">
input {
  @apply border-2 border-gray-200 rounded-md px-2 py-2 h-fit w-full;
}
input.datepicker {
  background-image: url('./assets/images/icons/calendar.svg');
  background-position: center right 0.425rem;
  background-repeat: no-repeat;
}
</style>
