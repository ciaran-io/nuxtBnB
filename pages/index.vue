<script>
export default {
  head: () => ({
    title: 'Homepage',
    meta: [
      {
        name: 'description',
        content: 'This is a homepage',
        hid: 'description',
      },
    ],
  }),

  async asyncData({ $dataApi }) {
    return {
      homes: (await $dataApi.getHomes()).json.hits,
    }
  },
}
</script>

<template>
  <div class="grid grid-flow-col gap-1">
    <NuxtLink
      v-for="home in homes"
      :key="home.objectID"
      :to="`/home/${home.objectID}`"
    >
      <HomeCard :home="home" />
    </NuxtLink>
  </div>
</template>
