<template>
  <button
    class="outlined-button"
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
.outlined-button {
  --outlined-button-color: inherit;
  --outlined-button-background: #fefefe;
  --outlined-button-border-color: #cccccc;
  --outlined-button-background-hover: #f6f6f6;
  --outlined-button-border-hover: #f6f6f6;
  --outlined-button-background-highlight: rgba(4, 87, 175, 0.24);
  display: flex;
  align-items: center;
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: var(--outlined-button-border-color);
  height: 40px;
  border-radius: 6px;
  padding: 0 .8rem;
  background: var(--outlined-button-background);
  font-size: 14px;
  font-family: inherit;
  color: var(--outlined-button-color);
}

.outlined-button:hover {
  background: var(--outlined-button-background-hover);
}

.outlined-button.highlighted {
  background: var(--outlined-button-background-highlight);
}
</style>
