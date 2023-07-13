<template>
  <ul v-show="open" class="listbox-menu" role="listbox" tabindex="-1">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .listbox-menu {
    position: absolute;
    z-index: 1;
    overflow-x: hidden;
    list-style: none;
    background-color: white;
    width: 100%;
    box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
    margin: 0;
    padding: 0;
  }
</style>
