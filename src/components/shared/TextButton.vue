<template>
  <button class="text-button" :style="theme" @click="$emit('click', $event);">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    theme: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.text-button {
  --text-button-color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  height: 40px;
  padding: 0 .8rem;
  font-size: 14px;
  font-family: inherit;
  background: none;
  color: var(--text-button-color);
}

.text-button:hover {
  background: #f6f6f6;
}
</style>
