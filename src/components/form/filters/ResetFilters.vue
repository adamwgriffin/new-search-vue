<template>
  <div class="reset-filters">
    <TextButton :theme="theme" @click="$emit('click')">
      {{ $t('reset_filters.btn') }}
    </TextButton>
  </div>
</template>

<script>
import TextButton from '@/components/shared/TextButton'

export default {
  components: { TextButton },

  computed: {
    theme() {
      return {
        '--text-button-color': '#5092d3'
      }
    }
  }
}
</script>

<style scoped>
.reset-filters {
  padding: 1rem;
}
</style>
