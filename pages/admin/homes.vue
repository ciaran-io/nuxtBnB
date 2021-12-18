<script>

export default {
    data: () => ({
        home: {
            title: "",
            description: "",
            note: "",
            pricePerNight: "",
            guest: "",
            bedrooms: "",
            beds: "",
            bathrooms: "",
            features: ["", "", "", "", ""],
            location: {
                address: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
            },
            __geoloc: {
                lat: '',
                lng: ''
            },
            images: []
        }
    }),

  mounted (){
  // this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
    this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
  },

methods: {

  changed(event){
    const addressParts = event.detail.address_components
    const street = this.getAddressPart(addressParts, 'street_number')?.short_name || ''
    const route = this.getAddressPart(addressParts, 'route')?.short_name || ''
    
    this.home.location.address = street + ' ' + route
    this.home.location.city = this.getAddressPart(addressParts, 'locality')?.short_name || ''
    this.home.location.state = this.getAddressPart(addressParts, 'administrative_area_level_1')?.long_name || ''
    this.home.location.country = this.getAddressPart(addressParts, 'country')?.short_name || ''
    this.home.location.postalCode = this.getAddressPart(addressParts, 'postal_code')?.short_name || ''


    const geo = event.detail.geometry.location
    this.home.__geoloc.lat = geo.lat()
    this.home.__geoloc.lng = geo.lng()
  },

  getAddressPart(parts, type){
    return parts.find(part => part.types.includes(type))
  },

  async onSubmit(){
    await fetch('/api/homes', {
      method: 'POST',
      body: JSON.stringify(this.home),
      headers: {
        'Content-Type': 'application/json',

      }
    })
  }
},

}
</script>


<template>
<div>
  <div>[list of homes]</div>
  <h2>Add a home</h2>
  <form @submit.prevent="onSubmit">
    images:<br/>
    <input  v-model="home.images[0]" type="text">

    Tiltle<br/>
    <input  v-model="home.title" type="text">

    Description<br/>
    <textarea  v-model="home.description" type="text"/>

    Note<br/>
    <textarea v-model="home.note"/>

    Features
    <input  v-model="home.features[0]" type="text">

    Price Per Night
    <input v-model="home.pricePerNight" type="number" >

    Guests / Rooms / Beds / bathrooms

    <input v-model="home.guests" type="number">
    <input v-model="home.bedrooms" type="number">
    <input v-model="home.beds" type="number">
    <input v-model="home.bathrooms" type="number">

    <!-- <input type="text" ref="locationSelector" autocomplete="off"  placeholder="Select a location" @changed="changed"> -->
    <input type="text" ref="locationSelector" autocomplete="off"  placeholder="Select a location" @changed="changed">
    Address: <input v-model="home.location.address" type="text">
    City: <input v-model="home.location.city" type="text">
    State: <input v-model="home.location.state" type="text">
    Postal Code: <input v-model="home.location.postalCode" type="text">
    Counrty: <input v-model="home.location.country" type="text">

    <SubmitButton>Add</SubmitButton>

  </form>
</div>
</template>