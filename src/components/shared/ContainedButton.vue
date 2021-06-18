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
  border: 1px solid #cccccc;
  height: 40px;
  border-radius: 6px;
  padding: 0 .8rem;
  background: #fefefe;
  font-size: 14px;
  font-family: inherit;
  color: inherit;
}

button:hover {
  background: #f6f6f6;
}

button.highlighted {
  background: rgba(4, 87, 175, 0.24);
}
</style>
