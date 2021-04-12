<template>
  <Fieldset>
    <Legend>Property Info</Legend>
    <SquareFeet :params="squareFeetParams" @change="updateValue($event)" />
  </Fieldset>
</template>

<script>
import pick from 'lodash/pick'
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import SquareFeet from '@/components/form/filters/SquareFeet'

export default {
  model: {
    prop: 'params',
    event: 'change'
  },

  components: { Fieldset, Legend, SquareFeet },

  props: {
    params: {
      type: Object
    }
  },

  computed: {
    squareFeetParams() {
      return pick(this.params, ['sqft_min', 'sqft_max'])
    }
  },

  methods: {
    updateValue(e) {
      this.$emit('change', e)
    }
  },
}
</script>

<style scoped>

</style>
