<template>
  <MenuButton :label="'Price Range'">
    <div class="price-range-menu">
      <div class="min-price">
        <TextField @input="updateValue('pricemin', $event)" :placeholder="'No min'" />
      </div>
      <div class="to">
        to
      </div>
      <div class="max-price">
        <TextField @input="updateValue('pricemax', $event)" :placeholder="'No max'" />
      </div>
    </div>
  </MenuButton>
</template>

<script>
import MenuButton from './MenuButton'
import TextField from './TextField'

export default {
  components: { MenuButton, TextField },

  props: {
    // this is the value that is passed to the component via v-model
    value: {
      type: Object,
      default: () => ({ pricemin: null, pricemax: null })
    }
  },

  methods: {
    updateValue(property, e) {
      console.log("updateValue()", property, e)
      // propagate the updated input back to the parent component using $emit. other components that are bound to the
      // same model with v-model will get the change
      this.$emit('input', { [property]: (+e || null) })
    }
  }
}
</script>

<style scoped>
.price-range-menu {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.to {
  padding: 0 1rem;
}
</style>
