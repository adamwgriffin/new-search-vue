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
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 14px 16px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 6px;
  background: #fefefe;
  height: 48px;
  font-size: 14px;
  font-family: inherit;
  color: inherit;
}

button.highlighted {
  background: rgba(4, 87, 175, 0.24);
}
</style>
