<template>
  <div class="listing-count">
    Showing {{ listingsLoaded }} of {{ availableListings }} Listings
  </div>
</template>

<script>
export default {
  props: {
    listingsLoaded: {
      type: Number
    },

    availableListings: {
      type: Number
    },
  },
}
</script>

<style scoped>
.listing-count {
  font-size: 14px;
}
</style>
