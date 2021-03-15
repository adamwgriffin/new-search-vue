<template>
  <Fieldset id="property-types">
    <Legend>{{ $t('property_types_heading') }}</Legend>
    <template v-for="(id, name) in propertyTypes">
      <input
        type="checkbox"
        :id="name"
        :name="name"
        :value="id"
        :checked="params.includes(id)"
        @change="updateParams($event.target)"
        :key="`checkbox-button-input-${id}`"
      >
      <label :for="name" :key="`checkbox-button-label-${id}`">
        {{ $t(`property_types.${name}`) }}
      </label>
    </template>
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
    propertyTypes: {
      type: Object,
    },

    params: {
      type: Array,
    }
  },

  methods: {
    addOrRemoveParams(checked, id) {
      return checked ? this.params.concat(id) : this.params.filter(p => p !== id) 
    },

    updateParams(target) {
      this.$emit('change', { ptype: this.addOrRemoveParams(target.checked, +target.value) })
    }
  }
}
</script>

<style scoped>
label {
  display: inline-block;
  cursor: pointer;
  /* the label text sometimes gets selected across a range of buttons with clicking them so setting this to stop that
  from happening */
  user-select: none;
  border-radius: 4px;
  border: 1px solid #dadada;
  padding: 6px 12px;
  margin: 0 0 4px 4px;
}


input[type=checkbox] {
  position: absolute;
  visibility: hidden;
  opacity: 0;
}

input[type=checkbox]:checked + label {
  background: #0773f8;
  color: white;
  border: #0773f8;
}
</style>
