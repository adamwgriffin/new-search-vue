<template>
  <div id="search-results-info">
    <ListingCount
      :class="listingCountClasses"
      :listingsLoaded="listingsLoaded"
      :availableListings="availableListings"
    />
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
    listingsLoaded: {
      type: Number,
      default: 0,
    },

    availableListings: {
      type: Number,
      default: 0,
    },

    params: {
      type: Object
    }
  },

  computed: {
    listingCountClasses() {
      return { 'no-listings': !this.listingsLoaded || !this.availableListings }
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
