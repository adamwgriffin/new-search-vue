<template>
  <ContainedButton id="boundary-control" @click="$emit('click')">
    Remove Boundary
  </ContainedButton>
</template>

<script>
import ContainedButton from '@/components/shared/ContainedButton'

export default {
  components: { ContainedButton }  
}
</script>

<style scoped>
#boundary-control {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  z-index: 1;
  margin: 0 0 5px 8px;
}
</style>
