<template>
  <div id="picklist-heading">
    SHOWING {{ countStart }} - {{ countEnd }} OF {{ total }} LISTINGS
  </div>
</template>

<script>
export default {
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
  padding: .9rem .9rem 0 .9rem;
  color: #212e35;
  font-family: Muli,Hevetica,Verdana,Arial,sans-serif;
  font-weight: 700;
  font-size: 12px;
}
</style>
