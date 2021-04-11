<template>
  <Fieldset>
    <Legend :level="2">Square Feet</Legend>
    <div class="square-feet">
      <ListComboBox
        name="sqft_min"
        placeholder="No Min"
        v-model="params.sqft_min"
        :options="squareFeetOptions"
        :numericOnly="true"
      />
      to
      <ListComboBox
        name="sqft_max"
        placeholder="No Max"
        v-model="params.sqft_max"
        :options="squareFeetOptions"
        :numericOnly="true"
      />
    </div>
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import EditableDropdown from '@/components/shared/EditableDropdown'
import ListComboBox from '@/components/shared/ListComboBox'
import { sqftOptionRanges } from '@/lib/constants/filter_constants'
import { numericOptions } from '@/lib/helpers/filters_helpers'

export default {
  components: { Fieldset, Legend, EditableDropdown, ListComboBox },

  model: {
    prop: 'params',
    event: 'change'
  },

  props: {
    params: {
      type: Object,
      default: () => ({ sqft_min: 0, sqft_max: 0 })
    }
  },

  computed: {
    squareFeetOptions() {
      return numericOptions(sqftOptionRanges)
    }
  },

  methods: {
    updateValue(property, n) {
      this.$emit('change', { [property]: n })
    }
  }
}
</script>

<style scoped>
.square-feet {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 27rem;
}
</style>
