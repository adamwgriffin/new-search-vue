<template>
  <Fieldset id="open-houses">
    <Legend>Open Houses</Legend>
    <label for="openhouse_in_person">
      <input
        type="checkbox"
        id="openhouse_in_person"
        name="openhouse_in_person"
        :value="params.openhouse_in_person"
        :checked="params.openhouse_in_person"
        @change="updateParams('openhouse_in_person', $event.target.checked)"
      >
      In Person
    </label>
    <label for="openhouse_virtual">
      <input
        type="checkbox"
        id="openhouse_virtual"
        name="openhouse_virtual"
        :value="params.openhouse_virtual"
        :checked="params.openhouse_virtual"
        @change="updateParams('openhouse_virtual', $event.target.checked)"
      >
      Virtual
    </label>
    <select
      id="openhouse"
      class="form-control"
      name="openhouse"
      aria-live="polite"
      :disabled="!openHouseOptionsSelected"
      @change="updateParams('openhouse', +$event.target.value || null)"
    >
      <option v-for="(val, key) in openHouseTimes" :key="key" :value="val">
        {{ openHouseTimeLabels[key] }}
      </option>
    </select>
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
      default: () => ({ openhouse: 2, openhouse_virtual: false, openhouse_in_person: false, })
    }
  },

  computed: {
    openHouseTimes() {
      return {
        this_weekend: 2,
        this_saturday: 3,
        this_sunday: 4,
        this_week: 5,
        today: 6,
        tomorrow: 7
      }
    },

    openHouseTimeLabels(key) {
      return {
        "this_weekend": "This Weekend",
        "this_saturday": "This Saturday",
        "this_sunday": "This Sunday",
        "this_week": "This Week",
        "today": "Today",
        "tomorrow": "Tomorrow"
      }
    },

    openHouseOptionsSelected() {
      return this.params.openhouse_virtual || this.params.openhouse_in_person
    },
  },

  methods: {
    updateParams(property, v) {
      this.$emit('change', { [property]: v })
    }
  },
}
</script>

<style scoped>

@media (min-width: 1025px) {
  label,
  select {
    display: block;
  }

  select {
    margin-top: .4rem;
  }
}
</style>
