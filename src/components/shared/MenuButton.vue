<template>
  <div class="menu-button" v-click-outside="closeMenu" :style="theme">
    <ContainedButton @click="toggleMenu" :highlighted="open">
      <span class="label">{{ label }}</span> <MenuOpenIcon :open="open" />
    </ContainedButton>
    <div v-show="open" class="menu">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ContainedButton from '@/components/shared/ContainedButton'
import MenuOpenIcon from '@/components/shared/icons/MenuOpenIcon'
import { ClickOutside } from '@/directives/ClickOutsideDirective'

export default {
  components: { ContainedButton, MenuOpenIcon },

  directives: { ClickOutside },

  props: {
    label: {
      type: String
    },

    theme: {
      type: Object
    }
  },

  data() {
    return {
      open: false
    }
  },

  methods: {
    toggleMenu() {
      this.open = !this.open
    },

    closeMenu() {
      this.open = false
    }
  }

}
</script>

<style scoped>
.menu-button {
  position: relative;
  display: inline-block;
  --menu-button-padding: 1rem;
}

.menu {
  position: absolute;
  right: 0;
  z-index: 1;
  min-width: 8rem;
  border-radius: 6px;
  margin-top: 3px;
  padding: var(--menu-button-padding);
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.06), 0px 3px 16px rgba(0, 0, 0, 0.04), 0px 5px 6px rgba(0, 0, 0, 0.06);
  background: #fefefe;
}

.label {
  margin-right: 0.3rem;
}
</style>
