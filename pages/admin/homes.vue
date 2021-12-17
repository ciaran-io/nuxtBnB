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
                counrty: "",
            },
            __geoloc: {
                lat: 26.1,
                lng: 26.1
            },
            images: []
        }
    }),

methods: {
  async onSubmit(){
    await fetch('/api/homes', {
      method: 'POST',
      body: JSON.stringify(this.home),
      headers: {
        'Content-Type': 'application/json',

      }
    })
  }
}
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
    <input type="number" v-model="home.pricePerNight">

    Guests / Rooms / Beds / bathrooms

    <input type="number" v-model="home.guests">
    <input type="number" v-model="home.bedrooms">
    <input type="number" v-model="home.beds">
    <input type="number" v-model="home.bathrooms">

    Address: <input  v-model="home.location.address" type="text">
    City: <input  v-model="home.location.city" type="text">
    State: <input  v-model="home.location.state" type="text">
    Postal Code: <input  v-model="home.location.PostalCode" type="text">
    Counrty: <input  v-model="home.location.counrty" type="text">

    <SubmitButton>Add</SubmitButton>


  </form>
</div>
</template>