<template>
  <MenuButton :label="'Bed + bath'">
    <fieldset id="bed_min">
      <legend>Beds</legend>
      <RadioButtonGroup :name="'bed_min'" :options="countOptions" @input="updateValue('bed_min', $event)" :value="value.bed_min" />
    </fieldset>
    <fieldset id="bath_min">
      <legend>Baths</legend>
      <RadioButtonGroup :name="'bath_min'" :options="countOptions" @input="updateValue('bath_min', $event)" :value="value.bath_min" />
    </fieldset>
  </MenuButton>
</template>

<script>
import MenuButton from '@/components/MenuButton'
import RadioButtonGroup from '@/components/RadioButtonGroup'

export default {
  components: { MenuButton, RadioButtonGroup },

  props: {
    countArr: {
      type: Array,
      default: () => [0, 1, 2, 3, 4, 5, 6]
    },

    value: {
      type: Object,
      default: () => ({ bed_min: 0, bath_min: 0 })
    }
  },

  computed: {
    countOptions() {
      return this.countArr.map(c => ({ label: this.countFormatted(c), value: c }) )
    },
  },

  methods: {
    countFormatted(n) {
      return n ? `${n}+` : 'Any'
    },

    updateValue(property, n) {
      this.$emit('input', { [property]: n })
    }
  }
}
</script>

<style scoped>
fieldset {
  border: none;
}

fieldset:first-child {
  margin-bottom: 1rem;
}

legend {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: .5rem;
}
</style>
