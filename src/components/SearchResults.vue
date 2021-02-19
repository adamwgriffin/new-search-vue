<template>
  <div id="search-results">
    <SearchResultsHeader :listings="listings" />
    <ListingCards :listings="listings" />
  </div>
</template>

<script>
import ListingCards from '@/components/ListingCards'
import SearchResultsHeader from '@/components/SearchResultsHeader'

export default {
  components: { ListingCards, SearchResultsHeader },

  props: {
    listings: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped>
#search-results {
  /* when parent is flex-direction: column, using flex: 1 allows the picklist to take up remaining space */
  flex: 1;
  padding: 0 .9rem .9rem .9rem;
  overflow-y: auto;
}
</style>
