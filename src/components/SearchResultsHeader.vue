<template>
  <div id="search-results-header">
    <div class="listing-count-container">
      <ListingCount v-if="totalListings" :total="totalListings" />
    </div>
    <div class="sort-listings">
      Sorted by: Price
    </div>
  </div>
</template>

<script>
import ListingCount from '@/components/ListingCount'

export default {
  components: { ListingCount, },

  props: {
    listings: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    totalListings() {
      return this.listings?.length || 0
    },
  }
}
</script>

<style scoped>
#search-results-header {
  display: flex;
  padding: .8rem 0;
}

.listing-count-container {
  flex-grow: 1;
}

.filters-container > * {
  padding-left: .5rem;
}
</style>
