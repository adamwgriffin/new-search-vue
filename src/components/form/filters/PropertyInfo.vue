<template>
  <Fieldset>
    <Legend>Property Info</Legend>
      <div class="row">
        <div class="column">
          <SquareFeet :params="squareFeetParams" @change="updateValue($event)" />
        </div>
        <div class="column">
          <LotSize :params="lotSizeParams" @change="updateValue($event)" />
        </div>
      </div>
      <div class="row">
        <div class="column">
          <YearBuilt :params="yearBuiltPararms" @change="updateValue($event)" />
        </div>
        <div class="column">
          <TimeOnMLS :value="params.days_indb" @input="updateValue($event)" />
        </div>
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
import TimeOnMLS from '@/components/form/filters/TimeOnMLS'
import WaterfrontDryLot from '@/components/form/filters/WaterfrontDryLot'

export default {
  model: {
    prop: 'params',
    event: 'change'
  },

  components: { Fieldset, Legend, SquareFeet, LotSize, YearBuilt, TimeOnMLS, WaterfrontDryLot },

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
/* could use flex-wrap: wrap; for mobile */
.row {
  display: flex;
}

/* can set this to width: 100%; for mobile */
.column {
  display: flex;
  margin-bottom: .6rem;
  width: 50%;
}

/* make sure to remove this at breakpoints where we would want columns to be width: 100% */
.column:first-child {
  margin-right: 6px;
}
</style>
