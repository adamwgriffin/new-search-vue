<template>
  <div id="picklist">
    <ul>
      <li class="listing-card" v-for="listing in listings" :key="listing.listing">
        {{ listing.location.address }}
      </li>
    </ul>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('listingSearchModule', ['listings'])
  }
}
</script>

<style scoped>
#picklist {
  width: 60%;
  padding: .5rem;
}
</style>
