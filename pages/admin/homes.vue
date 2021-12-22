<script>
import { unWrap } from '~/utils/fetchUtils'

export default {
  data: () => ({
    homeList: [],
    home: {
      title: '',
      description: '',
      note: '',
      pricePerNight: '',
      guest: '',
      bedrooms: '',
      beds: '',
      bathrooms: '',
      features: ['', '', '', '', ''],
      location: {
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      _geoloc: {
        lat: '',
        lng: '',
      },
      images: [],
      availabilityRanges: [
        { start: '', end: '' },
        { start: '', end: '' },
      ],
    },
  }),

  mounted() {
    this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
    this.setHomesList()
  },

  methods: {
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: 'DELETE',
      })
      const index = this.homeList.findIndex((obj) => obj.objectID === homeId)
      this.homeList.splice(index, 1)
    },

    async setHomesList() {
      this.homeList = (await unWrap(await fetch('/api/homes/user/'))).json
    },

    changed(event) {
      const addressParts = event.detail.address_components
      const route = this.getAddressPart(addressParts, 'route')?.short_name || ''

      const street =
        this.getAddressPart(addressParts, 'street_number')?.short_name || ''

      this.home.location.address = street + ' ' + route

      this.home.location.city =
        this.getAddressPart(addressParts, 'locality')?.short_name || ''

      this.home.location.state =
        this.getAddressPart(addressParts, 'administrative_area_level_1')
          ?.long_name || ''

      this.home.location.country =
        this.getAddressPart(addressParts, 'country')?.short_name || ''

      this.home.location.postalCode =
        this.getAddressPart(addressParts, 'postal_code')?.short_name || ''

      const geo = event.detail.geometry.location
      this.home._geoloc.lat = geo.lat()
      this.home._geoloc.lng = geo.lng()
    },

    getAddressPart(parts, type) {
      return parts.find((part) => part.types.includes(type))
    },

    async onSubmit() {
      const response = await unWrap(
        await fetch('/api/homes', {
          method: 'POST',
          body: JSON.stringify(this.home),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      this.homeList.push({
        title: this.home.title,
        objectID: response.json.homeId,
      })
    },

    imageUpdated(imageUrl, index) {
      this.home.images[index] = imageUrl
    },
  },
}
</script>

<template>
  <div>
    <div v-for="home in homeList" :key="home.objectID">
      {{ home.title }}
      <button class="delete" @click="deleteHome(home.objectID)">Delete</button>
    </div>

    <h2>Add a home</h2>
    <form @submit.prevent="onSubmit">
      <ImageUploader @file-uploaded="imageUpdated($event, 0)" />

      Tiltle<br />
      <input v-model="home.title" type="text" />

      Description<br />
      <textarea v-model="home.description" type="text" />

      Note<br />
      <textarea v-model="home.note" />

      Features
      <input v-model="home.features[0]" type="text" />

      Price Per Night
      <input v-model="home.pricePerNight" type="number" />

      Guests / Rooms / Beds / bathrooms

      <input v-model="home.guests" type="number" />
      <input v-model="home.bedrooms" type="number" />
      <input v-model="home.beds" type="number" />
      <input v-model="home.bathrooms" type="number" />

      <!-- <input type="text" ref="locationSelector" autocomplete="off"  placeholder="Select a location" @changed="changed"> -->
      <input
        ref="locationSelector"
        type="text"
        autocomplete="off"
        placeholder="Select a location"
        @changed="changed"
      />
      Address: <input v-model="home.location.address" type="text" /> City:
      <input v-model="home.location.city" type="text" /> State:
      <input v-model="home.location.state" type="text" /> Postal Code:
      <input v-model="home.location.postalCode" type="text" /> Counrty:
      <input v-model="home.location.country" type="text" />

      <date-picker
        v-for="(range, index) in home.availabilityRanges"
        :key="index"
        v-model="home.availabilityRanges[index]"
        is-range
        timezone="UTC"
        :modelConfig="{ timeAdjust: '00.00.00' }"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input :value="inputValue.start" v-on="inputEvents.start" />
          to
          <input :value="inputValue.end" v-on="inputEvents.end" />
        </template>
      </date-picker>

      <SubmitButton>Add</SubmitButton>
    </form>
  </div>
</template>
