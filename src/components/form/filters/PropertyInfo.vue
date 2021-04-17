<template>
  <Fieldset>
    <Legend>Property Info</Legend>
    <div class="row">
      <SquareFeet :params="squareFeetParams" @change="updateValue($event)" />
      <LotSize :params="lotSizeParams" @change="updateValue($event)" />
    </div>
    <div class="row">
      <YearBuilt :params="yearBuiltPararms" @change="updateValue($event)" />
    </div>
  </Fieldset>
</template>

<script>
import pick from 'lodash/pick'
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import SquareFeet from '@/components/form/filters/SquareFeet'
import LotSize from '@/components/form/filters/LotSize'
import YearBuilt from '@/components/form/filters/YearBuilt'

export default {
  model: {
    prop: 'params',
    event: 'change'
  },

  components: { Fieldset, Legend, SquareFeet, LotSize, YearBuilt },

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
    },

    yearBuiltPararms() {
      return pick(this.params, ['yearblt_min', 'yearblt_max'])
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
  margin-bottom: .6rem;
}

.row > *:first-child {
  margin-right: 6px;;
}
</style>
