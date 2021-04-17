<template>
  <Fieldset>
    <Legend :level="2">
      {{ $t('year_built_heading') }}
    </Legend>
    <div class="year-built">
      <NumberField
        :placeholder="$t('no_min')"
        :value="+params.yearblt_min || null"
        @input="updateValue('yearblt_min', $event.target.value)"
      />
      <div class="to">to</div>
      <NumberField
        :placeholder="$t('no_max')"
        :value="+params.yearblt_max || null"
        @input="updateValue('yearblt_max', $event.target.value)"
      />
    </div>
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import NumberField from '@/components/shared/NumberField'

export default {
  components: { Fieldset, Legend, NumberField },

  model: {
    prop: 'params',
    event: 'change'
  },

  props: {
    params: {
      type: Object,
      default: () => ({ yearblt_min: null, yearblt_max: null })
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
.year-built {
  display: flex;
  align-items: center;
}

.to {
  margin: 0 4px;
}
</style>
