<template>
  <Fieldset>
    <Legend>Property Info</Legend>
    <div class="row">
      <SquareFeet :params="squareFeetParams" @change="updateValue($event)" />
      <LotSize :params="lotSizeParams" @change="updateValue($event)" />
    </div>
  </Fieldset>
</template>

<script>
import pick from 'lodash/pick'
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import SquareFeet from '@/components/form/filters/SquareFeet'
import LotSize from '@/components/form/filters/LotSize'

export default {
  model: {
    prop: 'params',
    event: 'change'
  },

  components: { Fieldset, Legend, SquareFeet, LotSize },

  props: {
    params: {
      type: Object
    }
  },

  computed: {
    squareFeetParams() {
      return pick(this.params, ['sqft_min', 'sqft_max'])
    },

    lotSizeParams() {
      return pick(this.params, ['ls_conversion', 'lotsize_min', 'lotsize_max'])
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
.row {
  display: flex;
}

.row > *:first-child {
  margin-right: 6px;;
}
</style>
