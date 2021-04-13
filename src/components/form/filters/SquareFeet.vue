<template>
  <Fieldset>
    <Legend :level="2">
      {{ $t('interior_size.name') }}
    </Legend>
    <div class="square-feet">
      <ListComboBox
        name="sqft_min"
        :placeholder="$t('no_min')"
        :value="params.sqft_min" 
        :options="squareFeetOptions"
        @input="updateValue('sqft_min', $event)"
      />
      to
      <ListComboBox
        name="sqft_max"
        :placeholder="$t('no_max')"
        :value="params.sqft_max" 
        :options="squareFeetOptions"
        @input="updateValue('sqft_max', $event)"
      />
    </div>
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import ListComboBox from '@/components/shared/ListComboBox'
import { sqftOptionRanges } from '@/lib/constants/filter_constants'
import { optionsFromNumberRanges } from '@/lib/helpers/filters_helpers'

export default {
  components: { Fieldset, Legend, ListComboBox },

  model: {
    prop: 'params',
    event: 'change'
  },

  props: {
    params: {
      type: Object,
      default: () => ({ sqft_min: null, sqft_max: null })
    }
  },

  computed: {
    squareFeetOptions() {
      return optionsFromNumberRanges(sqftOptionRanges)
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
