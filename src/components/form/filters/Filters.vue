<template>
  <div id="filters">
    <slot></slot>
  </div>
</template>

<style scoped>
#filters {
  display: flex;
  margin-right: .5rem;
}
#filters > * {
  padding-left: .5rem;
}
</style>
