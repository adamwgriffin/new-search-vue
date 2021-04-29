<template>
  <div ref="searchResults" @scroll="handleScroll" class="search-results">
    <slot></slot>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    listingsLoaded: {
      type: Number
    },

    availableListings: {
      type: Number
    }
  },

  computed: {
    moreListingsAvailableToLoad () {
      return this.listingsLoaded < this.availableListings
    },
  },

  methods: {
    scrollPositionThresholdReached() {
      const { scrollHeight, scrollTop, clientHeight } = this.$refs.searchResults
      return Math.ceil(scrollHeight - scrollTop) === clientHeight
    },

    shouldLoadMoreListings() {
      return this.moreListingsAvailableToLoad && this.scrollPositionThresholdReached()
    },

    handleScroll: debounce(function () {
      if (this.shouldLoadMoreListings()) this.$emit('loadMoreListings')
    }, 200),
  }
}
</script>

<style scoped>
.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 0 .8rem .8rem .8rem;
}
</style>
