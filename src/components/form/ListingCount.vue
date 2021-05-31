<template>
  <div class="listing-count">
    Showing {{ listingsLoaded | formatNumber }} of {{ availableListings | formatNumber }} Listings
  </div>
</template>

<script>
import { formatNumber } from '@/lib/helpers/number_formatters'

export default {
  props: {
    listingsLoaded: {
      type: Number
    },

    availableListings: {
      type: Number
    },
  },

  filters: { formatNumber }
}
</script>

<style scoped>
.listing-count {
  font-size: 14px;
  font-weight: 600;
}
</style>
