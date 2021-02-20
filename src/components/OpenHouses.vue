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
      <option v-for="(val, key) in openHouseTimes" :key="key" :disabled="!val" :value="val">
        {{ openHouseTimeLabels[key] }}
      </option>
    </select>
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/Fieldset'
import Legend from '@/components/Legend'

export default {
  components: { Fieldset, Legend },

  model: {
    prop: 'params',
    event: 'change'
  },

  props: {
    params: {
      type: Object,
      default: () => ({ openhouse: null, openhouse_virtual: false, openhouse_in_person: false, })
    }
  },

  computed: {
    openHouseTimes() {
      return {
        none: null,
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
        "none": "None",
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

<style scope>

</style>
