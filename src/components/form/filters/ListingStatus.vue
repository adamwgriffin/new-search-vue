<template>
  <Fieldset id="listing-status">
    <Legend>Listing Status</Legend>
    <div class="status">
      <label for="active">
        <input
          type="radio"
          name="active"
          value="active"
          id="active"
          :checked="params.status === 'active'"
          @change="updateParams('status', 'active')"
        >
        Active
      </label>
      <label for="sold">
        <input
          type="radio"
          name="sold"
          value="sold"
          id="sold"
          :checked="params.status === 'sold'"
          @change="updateParams('status', 'sold')"
        >
        Sold
      </label>
      <label for="both">
        <input
          type="radio"
          name="both"
          value="both"
          id="both"
          :checked="params.status === 'both'"
          @change="updateParams('status', 'both')"
        >
        All listings
      </label>
      <select
        name="sold_days"
        id="sold_days"
        v-show="enableSoldDays"
        :disabled="!enableSoldDays"
        @change="updateParams('sold_days', +$event.target.value)"
      >
        <option v-for="days in soldDayOptions" :key="days" :value="days" :selected="params.sold_days === days">
          {{ soldDayLabels[days] }}
        </option>
      </select>
    </div>
    <div class="exclude">
      <label for="ex_pend">
        <input
          type="checkbox"
          id="ex_pend"
          name="ex_pend"
          :checked="params.ex_pend"
          @change="updateParams('ex_pend', $event.target.checked)"
        >
        Exclude pending listings
      </label>
      <label for="ex_cs">
        <input
          type="checkbox"
          id="ex_cs"
          name="ex_cs"
          :checked="params.ex_cs"
          @change="updateParams('ex_cs', $event.target.checked)"
        >
        Exclude coming soon listings
      </label>
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
      default: () => ({ status: 'active', ex_pend: true, ex_cs: true })
    }
  },

  computed: {
    enableSoldDays() {
      return this.params.status !== 'active'
    },

    soldDayOptions() {
      return [30, 90, 180, 365, 730]
    },

    soldDayLabels() {
      return {
        "30": "Sold last 30 days",
        "90": "Sold last 3 months",
        "180": "Sold last 6 months",
        "365": "Sold last 12 months",
        "730": "Sold last 2 years"
      }
    }
  },

  methods: {
    updateParams(property, v) {
      this.$emit('change', { [property]: v })
    }
  }
}
</script>

<style>
.status, .exclude {
  margin-bottom: .5rem;
}

label {
  white-space: nowrap;
}

#sold_days {
  margin-left: .4rem;
}

select, option {
  font-family: inherit;
}
</style>
