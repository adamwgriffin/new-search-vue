<template>
  <Fieldset>
    <Legend>
      {{ $t('features_heading') }}
    </Legend>
    <div class="features">
      <div v-for="(value, param) in params">
        <input
          type="checkbox"
          :id="param"
          :name="param"
          :checked="value"
          @change="updateParams(param, $event)"
          :key="`feature-checkbox-${param}`"
        >
        <label :for="param" :key="`feature-label-${param}`">
          {{ $t(`${param}_label`) }}
        </label>
      </div>
    </div>
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'

export default {
  components: { Fieldset, Legend },

  model: {
    prop: 'params',
    event: 'change'
  },

  props: {
    params: {
      type: Object,
    }
  },

  methods: {
    updateParams(param, e) {
      this.$emit('change', { [param]: e.target.checked })
    },
  }
}
</script>

<style scoped>
.features {
  column-count: 2;
}
</style>
