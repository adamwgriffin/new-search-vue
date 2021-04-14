<template>
  <Fieldset>
    <div class="heading">
      <Legend :level="2">
        {{ $t('lot_size_heading') }}
      </Legend>
      <div class="lot-size-conversion">
        <input
          type="radio"
          id="ls_conversion_acres"
          name="ls_conversion"
          value="acres"
          :checked="params.ls_conversion === 'acres'"
          @change="updateValue('ls_conversion', $event.target.value)"
        />
        <label for="ls_conversion_acres">
          {{ $t('size.unit.large') }}
        </label>
        <input
          type="radio"
          id="ls_conversion_sqft"
          name="ls_conversion"
          value="sqft"
          :checked="params.ls_conversion === 'sqft'"
          @change="updateValue('ls_conversion', $event.target.value)"
        />
        <label for="ls_conversion_sqft">
          {{ $t('size.unit.small') }}
        </label>
      </div>
    </div>
    <div class="lot-size">
      <ListComboBox
        name="lotsize_min"
        :placeholder="$t('no_min')"
        :value="params.lotsize_min" 
        @input="updateValue('lotsize_min', $event)"
        :options="lotSizeOptions"
      />
      <div class="to">to</div>
      <ListComboBox
        name="lotsize_max"
        :placeholder="$t('no_max')"
        :value="params.lotsize_max" 
        :options="lotSizeOptions"
        @input="updateValue('lotsize_max', $event)"
      />
    </div>
  </Fieldset> 
</template>

<script>
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import ListComboBox from '@/components/shared/ListComboBox'
import { lotSizeAcreOptions, lotSizeSqftOptions } from '@/lib/constants/filter_constants'

export default {
  components: { Fieldset, Legend, ListComboBox },

  model: {
    prop: 'params',
    event: 'change'
  },

  props: {
    params: {
      type: Object,
      default: () => ({ ls_conversion: 'acres', lotsize_min: null, lotsize_max: null })
    }
  },

  computed: {
    lotSizeOptions() {
      return this.params.ls_conversion === 'acres' ? lotSizeAcreOptions : lotSizeSqftOptions
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
.lot-size {
  display: flex;
  align-items: center;
}

.to {
  margin: 0 4px;
}

.heading {
  display: flex;
}

.lot-size-conversion {
  margin-left: 155px;
}

.lot-size-conversion input {
  appearance: none;
  position: absolute;
  opacity: 0;
}

.lot-size-conversion input:checked + label {
  border-bottom: 2px solid #0773f8;
}

.lot-size-conversion label {
  cursor: pointer;
  margin-right: 6px;
}
</style>
