<template>
  <div id="picklist">
    <div id="picklist-heading">
      SHOWING 1 - {{ listings.length }} OF {{ listings.length }} LISTINGS
    </div>
    <ListingCards :listings="listings" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListingCards from '@/components/ListingCards'

export default {
  components: { ListingCards },

  computed: {
    ...mapState('listingSearch', ['listings'])
  }
}
</script>

<style scoped>
#picklist {
  flex: 1;
  background: #f6f6f6;
  padding: .9rem;
}

#picklist-heading {
  height: 2rem;
  color: #212e35;
  font-family: Muli,Hevetica,Verdana,Arial,sans-serif;
  font-weight: 700;
  font-size: 12px;
}
</style>
