<template>
  <div class="menu-button" :style="theme">
    <OutlinedButton @click="$emit('click')" :highlighted="open">
      <span class="label">{{ label }}</span> <MenuOpenIcon v-if="showIcon" :open="open" />
    </OutlinedButton>
    <div v-show="open" class="menu">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import OutlinedButton from '@/components/shared/OutlinedButton'
import MenuOpenIcon from '@/components/shared/icons/MenuOpenIcon'

export default {
  components: { OutlinedButton, MenuOpenIcon },

  props: {
    open: {
      type: Boolean
    },

    label: {
      type: String
    },

    showIcon: {
      type: Boolean,
      default: true
    },

    theme: {
      type: Object
    }
  }
}
</script>

<style scoped>
.menu-button {
  position: relative;
  display: inline-block;
  --menu-button-menu-position-left: auto;
  --menu-button-menu-position-right: 0;
  --menu-button-menu-position-trasform: none;
}

.menu {
  position: absolute;
  left: var(--menu-button-menu-position-left);
  right: var(--menu-button-menu-position-right);
  transform: var(--menu-button-menu-position-trasform);
  z-index: 1;
  min-width: 8rem;
  border-radius: 6px;
  margin-top: 3px;
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.06),
    0px 3px 16px rgba(0, 0, 0, 0.04),
    0px 5px 6px rgba(0, 0, 0, 0.06);
  background: #fefefe;
}

.label {
  margin-right: 0.3rem;
  color: var(--menu-button-label-color);
}
</style>
