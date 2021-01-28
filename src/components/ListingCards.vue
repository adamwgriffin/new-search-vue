<template>
  <ul id="grid">
    <li class="grid-item" v-for="listing in listings" :key="listing.listingid">
      <ListingCard :listing="listing" />
    </li>
  </ul>
</template>

<script>
import ListingCard from '@/components/ListingCard'

export default {
  components: { ListingCard },

  props: {
    listings: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.3rem;
  margin: 0;
  padding: 0;
}

.grid-item {
  display: block;
  list-style: none;
}
</style>
