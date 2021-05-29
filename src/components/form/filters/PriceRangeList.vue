<template>
  <ul class="price-list" role="listbox">
    <li
      v-for="price in priceRanges"
      :key="price"
      class="price-list-item"
      role="option"
      @click="$emit('click', price)"
    >
      {{ price | priceLabel }}
    </li>
  </ul>
</template>

<script>
import range from 'lodash/range'
import { priceRangeNumbers } from '@/lib/constants/filter_constants'
import { formatPrice } from '@/lib/helpers/number_formatters'

export default {
  filters: {
    priceLabel(price) {
      return price ? formatPrice(price) : 'Any'
    } 
  },

  computed: {
    priceRanges() {
      return priceRangeNumbers
        .reduce((prices, priceRange) => prices.concat(range(...priceRange)) , []);
    }
  }
}
</script>

<style scoped>
.price-list {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
}

.price-list-item {
  padding: .6rem;
  cursor: pointer;
}
.price-list-item:hover {
  background: #f6f6f6;
}
</style>
