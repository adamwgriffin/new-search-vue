<template>
  <div id="picklist">
    <slot></slot>
  </div>
</template>

<style scoped>
#picklist {
  /* when parent is flex-direction: column, using flex: 1 allows the picklist to take up remaining space */
  flex: 1;
  padding: 0 .9rem .9rem .9rem;
  overflow-y: auto;
}
</style>
