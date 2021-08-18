<template>
  <MenuButton
    :label="$t('saved_search.save_search_btn')"
    :showIcon="false"
    :theme="theme"
    :open="open"
    @click="toggleMenu"
    v-click-outside="closeMenu"
  >
    <div class="save-search-form">
      TBD
    </div>
  </MenuButton>
</template>

<script>
import MenuButton from '@/components/shared/MenuButton'
import menu_open_mixin from '@/mixins/menu_open_mixin'

export default {
  mixins: [menu_open_mixin],

  components: { MenuButton },

  computed: {
    theme() {
      return { '--menu-button-label-color': '#5090d3' }
    }
  }
}
</script>

<style scoped>
.save-search-form {
  padding: 1rem;
}
</style>
