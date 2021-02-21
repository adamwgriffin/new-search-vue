<template>
  <div id="search-results-info">
    <ListingCount :class="listingCountClasses" :total="totalListings" />
    <SortMenu />
  </div>
</template>

<script>
import ListingCount from '@/components/form/ListingCount'
import SortMenu from '@/components/form/SortMenu'

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
  padding: .8rem .3rem .1rem .2rem;
}

.no-listings {
  visibility: hidden;
}
</style>
