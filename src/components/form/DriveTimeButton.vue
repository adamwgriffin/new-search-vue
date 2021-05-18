<template>
  <button
    id="drive-time-menu-button"
    @click="handleClick"
    :title="$t('drive_time.tooltip')"
    :aria-label="$t('drive_time.tooltip')"
    aria-expanded="false"
    aria-owns="drive-time-form-fields drive-time-header"
  >
    <DriveTimeIcon />
  </button>
</template>

<script>
import DriveTimeIcon from '@/components/shared/icons/DriveTimeIcon'

export default {
  components: { DriveTimeIcon, },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
#drive-time-menu-button {
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 2px;
  padding: 0 14px 0 12px;
}
</style>
