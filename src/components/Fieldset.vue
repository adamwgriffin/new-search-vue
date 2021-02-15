<template>
  <fieldset :id="id">
    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  }
}
</script>

<style scoped>
fieldset {
  border: none;
  margin: 0;
  padding: 0;
}
</style>
