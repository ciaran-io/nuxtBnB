<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div>
    <img
      :src="home.images[0]"
      style="object-fit: fill"
      width="200"
      height="200"
      alt=""
    />
    <h2>{{ home.title }}</h2>
    <p>{{ home.location.address }}</p>
    <p>{{ home.location.city }}</p>
    <p>{{ home.location.state }}</p>
    <p>{{ home.guests }} guests</p>
    <p>
      <span>${{ home.pricePerNight }}</span>
      / night
    </p>
  </div>
</template>
