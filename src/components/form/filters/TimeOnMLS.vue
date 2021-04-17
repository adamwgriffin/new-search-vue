<template>
  <div class="time-on-mls">
    <LabelHeading for="days_indb">
      {{ $t('time_on_mls_in_days.heading') }}
    </LabelHeading>
    <NumberField
      name="days_indb"
      id="days_indb"
      :placeholder="$t('time_on_mls_in_days.placeholder')"
      :value="value"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
import LabelHeading from '@/components/shared/LabelHeading'
import NumberField from '@/components/shared/NumberField'

export default {
  components: { LabelHeading, NumberField },

  props: {
    // this is the value that is passed to the component via v-model
    value: {
      type: Number
    }
  },

  methods: {
    updateValue(e) {
      this.$emit('input', { days_indb: +e })
    }
  }
}
</script>

<style scoped>
.time-on-mls,
input {
  width: 100%;
}
</style>
