<script>
export default {
  data: () => ({
    range: {
      start: new Date(),
      end: new Date(),
    },
    location: {
      lat: 0,
      lng: 0,
      label: '',
    },
  }),

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
      this.location.lat = place.geometry.location.lat()
      this.location.lng = place.geometry.location.lng()
      this.location.label = this.$refs.citySearch.value
    },
    search() {
      if (!this.location.label) return
      this.$router.push({
        name: 'search',
        query: {
          ...this.location,
          start: this.range.start.getTime() / 1000,
          end: this.range.end.getTime() / 1000,
        },
      })
    },
  },
}
</script>

<template>
  <div>
    <header
      class="gutter content-wrapper content-wrapper-header md:grid-rows-[1fr,auto] mt:mt-6 grid mt-3 grid-cols-[1fr,auto] items-end md:gap-y-8"
    >
      <NuxtLink to="/" class="w-max place-self-center md:row-start-1">
        <img src="~/images/logo.svg" alt="" class="w-auto h-10" />
      </NuxtLink>

      <div
        class="md:flex md:items-center md:row-start-1 md:place-self-end md:gap-x-2 hidden"
      >
        <template v-if="isLoggedIn">
          <img src="~/icons/house.svg" alt="" class="w-6 h-6 text-blue-500" />
          <span class="text-sm"> Host </span>
          <img :src="user.profileUrl" alt="" class="avatar" />
        </template>
        <div v-show="!isLoggedIn" id="googleButton">Button</div>
      </div>

      <div
        class="hidden md:grid md:grid-cols-[max-content,auto] md:gap-x-2 md:max-w-max md:place-self-center"
      >
        <input
          ref="citySearch"
          type="text"
          placeholder="Enter your address"
          @changed="changed"
        />
        <client-only>
          <template #placeholder>
            <div class="md:flex">
              <input class="datepicker" />
              <span class="md:place-self-center md:mx-3">to</span>
              <input class="datepicker" />
            </div>
          </template>

          <date-picker
            v-model="range"
            is-range
            timezone="UTC"
            :model-config="{ timeAdjust: '00.00.00' }"
            class="md:flex"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="datepicker"
              />

              <span class="md:place-self-center md:mx-3">to</span>

              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="datepicker"
              />

              <button class="search ml-2" @click="search">
                <img src="~/icons/search.svg" alt="" class="w-4 h-full" />
              </button>
            </template>
          </date-picker>
        </client-only>
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
