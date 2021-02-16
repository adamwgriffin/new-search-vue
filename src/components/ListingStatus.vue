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
          @change="updateSelections('status', 'active')"
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
          @change="updateSelections('status', 'sold')"
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
          @change="updateSelections('status', 'both')"
        >
        All listings
      </label>
    </div>
    <div class="exclude">
      <label for="ex_pend">
        <input
          type="checkbox"
          id="ex_pend"
          name="ex_pend"
          :checked="params.ex_pend"
          @change="updateSelections('ex_pend', $event.target.checked)"
        >
        Exclude pending listings
      </label>
      <label for="ex_cs">
        <input
          type="checkbox"
          id="ex_cs"
          name="ex_cs"
          :checked="params.ex_cs"
          @change="updateSelections('ex_cs', $event.target.checked)"
        >
        Exclude coming soon listings
      </label>
    </div>
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
      default: () => ({ status: 'active', ex_pend: true, ex_cs: true })
    }
  },

  methods: {
    updateSelections(property, v) {
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
</style>
