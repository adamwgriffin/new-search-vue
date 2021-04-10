<template>
  <span
    :role="ariaRole"
    :aria-hidden="!buttonRole"
    :aria-pressed="buttonRole && open"
    class="menu-open-icon"
    :class="menuOpenClasses"
    @click="handleClick"
  >
    ▾
  </span>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },

    ariaRole: {
      type: String,
      validator(role) {
        return ['button', 'presentation'].includes(role)
      }
    }
  },

  computed: {
    buttonRole() {
      return this.ariaRole === 'button'
    },

    menuOpenClasses() {
      return { open: this.open }
    }
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }

}
</script>

<style scoped>
.menu-open-icon {
  display: inline-block;
  user-select: none;
  transform: rotate(0deg);
  transition: transform 150ms linear;
}

.menu-open-icon.open {
  transform: rotate(180deg);
  transition: transform 150ms linear;
}

.menu-open-icon[role=button] {
  cursor: pointer;
}
</style>
