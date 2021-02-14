<template>
  <div id="picklist-heading">
    <div class="count">
      {{ total }} Listings
    </div>
    <div class="filters">
      <PriceRange />
    </div>
  </div>
</template>

<script>
import PriceRange from './PriceRange'

export default {
  components: { PriceRange },

  props: {
    countStart: {
      type: Number,
      default: () => 1
    },

    countEnd: {
      type: Number
    },

    total: {
      type: Number
    }
  }
}
</script>

<style scoped>
#picklist-heading {
  display: flex;
  align-items: center;
  padding: .9rem;
}

.count {
  flex-grow: 1;
  font-size: 14px;
}
</style>
