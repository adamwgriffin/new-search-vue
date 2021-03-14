<template>
  <span class="menu-open-icon" :class="menuOpenClasses" role="presentation" >▾</span>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    menuOpenClasses() {
      return { open: this.open }
    }
  },

}
</script>

<style scoped>
.menu-open-icon {
  display: inline-block;
  transform: rotate(0deg);
  transition: transform 150ms linear;
}

.menu-open-icon.open {
  transform: rotate(180deg);
  transition: transform 150ms linear;
}
</style>
