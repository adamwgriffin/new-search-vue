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
        :key="`checkbox-input-${id}`"
        :ref="`checkbox${id}`"
      >
      <label :for="name" :key="`checkbox-label-${id}`" @click="setFocus(id)">
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
    },

    // Firefox and Safari will not display the focus ring on the checkbox button unless we set focus manually when the
    // label is clicked
    setFocus(id) {
      this.$refs[`checkbox${id}`][0].focus()
    }
  }
}
</script>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}

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

input:checked + label {
  background: #0773f8;
  border: #0773f8;
  color: white;
}

/* both of these are necessary in order for the focus ring to appear on the checkbox button in all browsers */
input:focus + label {
  outline: 3px auto Highlight;
}
@media (-webkit-min-device-pixel-ratio:0) {
  input:focus + label {
    outline-color: -webkit-focus-ring-color;
  }
}
</style>
