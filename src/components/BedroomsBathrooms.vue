<template>
  <MenuButton :label="'Bed + bath'">
    <fieldset id="bed_min">
      <legend>Beds</legend>
      <div class="container">
        <template v-for="count in countOptions">
          <input
            type="radio"
            name="bed_min"
            :value="count"
            :id="`bed_min_${count}`"
            :key="`bed_min-radio-${count}`"
            :checked="count === value.bed_min"
            @change="updateValue('bed_min', count)"
          >
          <label :for="`bed_min_${count}`" :key="`bed_min-label-${count}`">
            {{ countFormatted(count) }}
          </label>
        </template>
      </div>
    </fieldset>
    <fieldset id="bath_min">
      <legend>Baths</legend>
      <div class="container">
        <template v-for="count in countOptions">
          <input
            type="radio"
            name="bath_min"
            :value="count"
            :id="`bath_min_${count}`"
            :key="`bath_min-radio-${count}`"
            :checked="count === value.bath_min"
            @change="updateValue('bath_min', count)"
          >
          <label :for="`bath_min_${count}`" :key="`bath_min-label-${count}`">
            {{ countFormatted(count) }}
          </label>
        </template>
      </div>
    </fieldset>
  </MenuButton>
</template>

<script>
import MenuButton from '@/components/MenuButton'

export default {
  components: { MenuButton },

  props: {
    countOptions: {
      type: Array,
      default: () => [0, 1, 2, 3, 4, 5, 6]
    },

    value: {
      type: Object,
      default: () => ({ bed_min: 0, bath_min: 0 })
    }
  },

  methods: {
    countFormatted(n) {
      return n ? `${n}+` : 'Any'
    },

    updateValue(property, n) {
      this.$emit('input', { [property]: +n })
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

.container {
  display: flex;
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.04), 0px 2px 2px rgba(0, 0, 0, 0.02), 0px 1px 3px rgba(0, 0, 0, 0.06);
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 56px;
  height: 48px;
  font-size: 14px;
  border-left: 1px solid #e7e7e7;
}

label:hover {
  background: #F6F6F6;
}

input {
  position: absolute;
  opacity: 0;
  margin: 0;
}

input[type=radio]:checked + label{
  background: rgba(4, 87, 175, 0.24);
}
</style>
