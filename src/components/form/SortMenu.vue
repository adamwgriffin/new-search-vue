<template>
  <div class="sort-menu">
    Sort: Distance <MenuOpenIcon :open="open" />
  </div>
</template>

<script>
import MenuOpenIcon from '@/components/shared/MenuOpenIcon'

export default {
  components: { MenuOpenIcon },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style>
.sort-menu {
  cursor: pointer;
}
</style>
