<template>
  <div id="search-results-info">
    <ListingCount :class="listingCountClasses" :total="totalListings" />
    <SortMenu :sortOptions="sortOptions" :params="params" @change="updateParams($event)" />
  </div>
</template>

<script>
import ListingCount from '@/components/form/ListingCount'
import SortMenu from '@/components/form/SortMenu'
import { defaultSortOptions } from '@/lib/constants/filter_constants'

export default {
  components: { ListingCount, SortMenu, },

  props: {
    listings: {
      type: Array,
      default: () => []
    },

    params: {
      type: Object
    }
  },

  computed: {
    totalListings() {
      return this.listings?.length || 0
    },

    listingCountClasses() {
      return { 'no-listings': !this.totalListings }
    },

    sortOptions() {
      return defaultSortOptions
    }
  },

  methods: {
    updateParams(e) {
      this.$emit('change', e)
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
