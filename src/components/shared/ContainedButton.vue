<template>
  <button
    class="contained-button"
    :class="buttonClasses"
    :style="theme"
    @click="$emit('click', $event);"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    highlighted: {
      type: Boolean
    },

    theme: {
      type: Object,
      default() {
        return {}
      }
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
.contained-button {
  --contained-button-color: inherit;
  --contained-button-background: #fefefe;
  --contained-button-background-hover: #f6f6f6;
  --contained-button-background-highlight: rgba(4, 87, 175, 0.24);
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  height: 40px;
  border-radius: 6px;
  padding: 0 .8rem;
  background: var(--contained-button-background);
  font-size: 14px;
  font-family: inherit;
  color: var(--contained-button-color);
}

.contained-button:hover {
  background: var(--contained-button-background-hover);
}

.contained-button.highlighted {
  background: var(--contained-button-background-highlight);
}
</style>
