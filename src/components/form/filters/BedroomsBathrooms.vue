<template>
  <MenuButton
    label="Bed + bath"
    :open="open"
    @click="toggleMenu"
    v-click-outside="closeMenu"
  >
    <div class="bedrooms-bathrooms-body">
      <Fieldset id="bed_min">
        <Legend>Beds</Legend>
        <RadioButtonGroup
          :name="'bed_min'"
          :options="countOptions"
          @input="updateValue('bed_min', $event)"
          :value="value.bed_min"
        />
      </Fieldset>
      <Fieldset id="bath_min">
        <Legend>Baths</Legend>
        <RadioButtonGroup
          :name="'bath_min'"
          :options="countOptions"
          @input="updateValue('bath_min', $event)"
          :value="value.bath_min"
        />
      </Fieldset>
    </div>
    <ApplyFilters @cancelClicked="closeMenu" @applyClicked="handleApplyClicked" />
  </MenuButton>
</template>

<script>
import MenuButton from '@/components/shared/MenuButton'
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import RadioButtonGroup from '@/components/shared/RadioButtonGroup'
import ApplyFilters from '@/components/form/filters/ApplyFilters'
import menu_open_mixin from '@/mixins/menu_open_mixin'

export default {
  mixins: [menu_open_mixin],

  components: { MenuButton, Fieldset, Legend, RadioButtonGroup, ApplyFilters },

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
    },

    handleApplyClicked() {
      this.closeMenu()
      this.$emit('searchInitiated')
    }
  }
}
</script>

<style scoped>
.bedrooms-bathrooms-body {
  padding: 1rem 1rem 0 1rem;
}

#bed_min {
  margin-bottom: 1rem;
}
</style>
