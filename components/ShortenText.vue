<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    isExpanded: !true,
    textColumns: [],
    read: 'read more',
  }),

  computed: {
    textIsLong() {
      return this.textColumns.length === 2
    },

    displayText() {
      if (!this.textIsLong || this.isExpanded) return this.textColumns.join(' ')
      return this.textColumns[0] + '...'
    },
  },

  created() {
    this.textColumns = this.getTextColumns()
  },

  methods: {
    getTextColumns() {
      const position = this.text.indexOf(' ', this.target)
      if (this.text.length <= this.target || position === -1) return [this.text]

      return [this.text.substring(0, position), this.text.substring(position)]
    },
  },
}
</script>

<template>
  <div>
    <p class="before:content-['\275D'] before:text-slate-500">
      {{ displayText }}
    </p>
    <BaseButton
      v-if="textIsLong && !isExpanded"
      @click.native="isExpanded = true"
    >
      Read more
    </BaseButton>

    <BaseButton
      v-if="textIsLong && isExpanded"
      @click.native="isExpanded = false"
    >
      Read less
    </BaseButton>
  </div>
</template>

<style lang="postcss" scoped>
button {
  @apply text-blue-500 text-right mt-3 underline decoration-dotted;
}
</style>
