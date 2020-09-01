<template>
  <button id="search-button" @click.prevent="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style>
#search-button {
  margin-left: 1rem;
  width: 5rem;
  height: 2.2rem;
  border-radius: .5rem;
  background: gray;
  color: white;
  font-size: 1rem;
}
</style>
