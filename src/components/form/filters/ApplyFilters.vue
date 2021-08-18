<template>
  <div class="apply-filters">
    <TextButton
      :theme="cancelButtonTheme"
      @click="$emit('cancelClicked')"
    >
      {{ $t('cancel') }}
    </TextButton>
    <ContainedButton
      :theme="applyButtonTheme"
      @click="$emit('applyClicked')"
    >
      {{ $t('apply') }}
    </ContainedButton>
  </div>
</template>

<script>
import ContainedButton from '@/components/shared/ContainedButton'
import TextButton from '@/components/shared/TextButton'

export default {

  components: { ContainedButton, TextButton },

  computed: {
    cancelButtonTheme() {
      return { '--text-button-color': '#5092d3' }
    },

    applyButtonTheme() {
      return {
        '--contained-button-color': 'white',
        '--contained-button-background': '#5092d3',
        '--contained-button-background-hover': '#3d6fa1'
      }
    }
  }

}
</script>

<style scoped>
.apply-filters {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.apply-filters > * {
  margin-left: .6rem;
}
</style>
