<template>
  <div class="listing-count">
    {{ total }} Listings
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    }
  }
}
</script>

<style scoped>
.listing-count {
  font-size: 14px;
}
</style>
