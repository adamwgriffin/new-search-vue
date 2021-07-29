<template>
  <input
    type="number"
    :value="value"
    @input="$emit('input', $event)"
  >
</template>

<script>
export default {
  props: {
    // this is the value that is passed to the component via v-model
    value: {
      type: Number
    }
  }
}
</script>

<style scoped>
input {
  border-radius: 6px;
  margin: 1px;
  border: 1px solid #cccccc;
  padding: 11px 16px;
  width: 100%;
}

/* hide the up/down arrows in input number fields */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  appearance: none;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>
