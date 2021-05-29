<template>
  <input
    :value="valueFormatted"
    class="formatted-input"
    ref="input"
    type="text"
    @input="updateValue($event.target.value)"
    @focus="$emit('focus')"
  >
</template>

<script>
export default {
  props: {
    // this is the value that is passed to the component via v-model
    value: {
      default: null
    },

    formatFunc: {
      type: Function,
      default: (v) => (v)
    },

    unformatFunc:{
      type: Function,
      default: (v) => (v)
    },
  },

  data() {
    return {
      valueFormatted: '',
    }
  },

  watch: {
    value() {
      const newValueFormatted = this.formatFunc(this.value)
      const diff = newValueFormatted.length - this.$refs.input.value.length
      this.setCursorPositionOnNextTick(this.$refs.input.selectionStart + diff)
      this.valueFormatted = newValueFormatted
    }
  },

  methods: {
    updateValue(value) {
      this.$emit('input', this.unformatFunc(value))
    },

    async setCursorPositionOnNextTick(position) {
      await this.$nextTick()
      this.$refs.input.focus()
      this.$refs.input.setSelectionRange(position, position)
    }
  }
}
</script>
