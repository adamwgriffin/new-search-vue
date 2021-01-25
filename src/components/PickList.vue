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
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('listingSearch', ['listings'])
  }
}
</script>

<style scoped>
#picklist {
  width: 60%;
  padding: .5rem;
}
</style>
