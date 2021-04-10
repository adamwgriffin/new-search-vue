<template>
  <legend :class="legendClasses"><slot></slot></legend>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },

  computed: {
    legendClasses() {
      return { [`level-${this.level}`]: true }
    }
  }
}
</script>

<style scoped>
legend {
  margin-bottom: .6rem;
}

.level-1 {
  font-weight: 700;
  font-size: 18px;
}

.level-2 {
  font-weight: 600;
  font-size: 14px;
}
</style>
