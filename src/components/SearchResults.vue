<template>
  <div class="search-results">
    <slot></slot>
  </div>
</template>

<style scoped>
.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 0 .8rem .8rem .8rem;
}
</style>
