<template>
  <button
    id="search-button"
    type="submit"
    form="search-form"
    value="Submit"
    tabindex="0"
    @click="handleClick"
    title="Execute search"
    aria-label="Execute search"
  >
    <SearchButtonIcon />
  </button>
</template>

<script>
import SearchButtonIcon from '@/components/shared/icons/SearchButtonIcon'

export default {
  components: { SearchButtonIcon },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
#search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 0 8px;
  background: rgb(0, 48, 87);
  border-radius: 0 6px 6px 0;
}
</style>
