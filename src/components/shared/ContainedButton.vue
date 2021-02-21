<template>
  <button :class="buttonClasses" @click="$emit('click', $event);">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    highlighted: {
      type: Boolean
    }
  },

  computed: {
    buttonClasses() {
      return { highlighted: this.highlighted }
    }
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.04), 0px 2px 2px rgba(0, 0, 0, 0.02), 0px 1px 3px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 14px 16px;
  background: #fefefe;
  height: 48px;
  font-size: 14px;
  font-family: inherit;
}

button.highlighted {
  background: rgba(4, 87, 175, 0.24);
}
</style>
