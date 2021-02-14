<template>
  <div @click="toggleMenu" v-click-outside="closeMenu" class="menu-button">
    <ContainedButton :highlighted="open">
      {{ label }}
    </ContainedButton>
    <div v-show="open" class="menu">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ContainedButton from './ContainedButton'
import { ClickOutside } from '../directives/ClickOutsideDirective'

export default {
  components: { ContainedButton },

  directives: { ClickOutside },

  props: {
    label: {
      type: String
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
}

.menu {
  position: absolute;
  overflow: auto;
  right: 0;
  z-index: 1;
  border-radius: 8px;
  margin-top: 3px;
  padding: 16px 14px;
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.06), 0px 3px 16px rgba(0, 0, 0, 0.04), 0px 5px 6px rgba(0, 0, 0, 0.06);
  background: #fefefe;
}
</style>
