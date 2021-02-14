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
  padding: .9rem .9rem 0 .9rem;
}

.count {
  flex-grow: 1;
  color: #212e35;
  font-family: "Open Sans", Hevetica, Verdana, Arial, sans-serif;
  font-size: 14px;
  color: #333333;
}
</style>
