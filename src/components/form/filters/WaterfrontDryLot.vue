<template>
  <div class="waterfront-dry-lot">
    <LabelHeading for="water">
      {{ $t('waterfront_dry_lot.heading') }}
    </LabelHeading>
    <select id="water" name="water" @change="updateParams($event)">
      <option v-for="(value, option) in waterOptions" :key="option" :value="value" :selected="params === value">
        {{ $t(`waterfront_dry_lot.options.${option}`) }}
      </option>
    </select>
  </div>
</template>

<script>
import LabelHeading from '@/components/shared/LabelHeading'

export default {
  components: { LabelHeading },

  model: {
    prop: 'params',
    event: 'change'
  },

  props: {
    params: {
      type: Number
    }
  },

  computed: {
    waterOptions() {
      return {
        neither: null,
        waterfront: 1,
        dry_lot: 0,
      }
    }
  },

  methods: {
    updateParams(e) {
      const water = e.target.value === '' ? null : +e.target.value
      this.$emit('change', { water })
    }
  }
}
</script>

<style scoped>
#water {
  appearance: none;
  border-radius: 6px;
  border: 1px solid rgba(51, 51, 51, 0.38);
  padding: 9.6px 16px;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 50%;
  width: 24rem;
}
</style>
