<script>
import homes from '~/data/homes'

export default {
  data: () => ({
    homes: homes.slice(0, 3),
  }),
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
