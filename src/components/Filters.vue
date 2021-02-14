<template>
  <div id="filters">
    <div class="count">
      {{ total }} Listings
    </div>
    <div class="filters-container">
      <PriceRange :value="priceRange" @input="setSearchParams($event)" />
    </div>
  </div>
</template>

<script>
import PriceRange from './PriceRange'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { PriceRange },

  props: {
    total: {
      type: Number
    }
  },

  computed: {
    ...mapState('listingSearch', [
      'searchParams'
    ]),

    priceRange() {
      return { pricemin: this.searchParams.pricemin, pricemax: this.searchParams.pricemax }
    }
  },

  methods: {
    ...mapMutations('listingSearch', [
      'setSearchParams'
    ]),
  }
}
</script>

<style scoped>
#filters {
  display: flex;
  align-items: center;
  padding: .9rem;
}

.count {
  flex-grow: 1;
  font-size: 14px;
}
</style>
