<template>
  <button id="search-button" @click.prevent="search">Search</button>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('listingSearch', [
      'searchParams'
    ])
  },

  methods: {
    ...mapActions('listingMap', ['setMapLocation']),

    ...mapActions('listingSearch', ['searchListings']),

    search() {
      this.setMapLocation({ address: this.searchParams.location_search_field })
      this.searchListings(this.searchParams)
    }
  }
}
</script>

<style>
#search-button {
  margin-left: 1rem;
  width: 5rem;
  height: 2.2rem;
  border-radius: .5rem;
  background: gray;
  color: white;
  font-size: 1rem;
}
</style>
