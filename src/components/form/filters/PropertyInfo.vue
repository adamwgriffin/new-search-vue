<template>
  <Fieldset>
    <Legend>Property Info</Legend>
    <SquareFeet />
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/shared/Fieldset'
import Legend from '@/components/shared/Legend'
import SquareFeet from '@/components/form/filters/SquareFeet'

export default {
  components: { Fieldset, Legend, SquareFeet },
}
</script>

<style scoped>

</style>
