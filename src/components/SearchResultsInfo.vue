<template>
  <div id="search-results-info">
    <ListingCount :class="listingCountClasses" :total="totalListings" />
    <SortMenu />
  </div>
</template>

<script>
import ListingCount from '@/components/ListingCount'
import SortMenu from '@/components/SortMenu'

export default {
  components: { ListingCount, SortMenu, },

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

    listingCountClasses() {
      return { 'no-listings': !this.totalListings }
    }
  },
}
</script>

<style scoped>
#search-results-info {
  display: flex;
  justify-content: space-between;
  padding: .8rem 0;
}

.no-listings {
  visibility: hidden;
}
</style>
