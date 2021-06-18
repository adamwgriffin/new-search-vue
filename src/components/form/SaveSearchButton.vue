<template>
  <MenuButton
    :label="$t('saved_search.save_search_btn')"
    :showIcon="false"
    :theme="theme"
  >
    <div class="save-search-form">
      TBD
    </div>
  </MenuButton>
</template>

<script>
import MenuButton from '@/components/shared/MenuButton'

export default {
  components: { MenuButton },

  computed: {
    theme() {
      return { '--menu-button-label-color': '#5090d3' }
    }
  }
}
</script>

<style scoped>

</style>
