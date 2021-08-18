<template>
  <div id="map-type-control" class="menu-button" v-click-outside="closeMenu">
    <ContainedButton
      id="map-type-button"
      title="Change map type"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggleMenu"
    >
      <span class="label">{{ $t('map_type_btn.label') }}</span>
      <MenuOpenIcon :open="open" role="button" />
    </ContainedButton>
    <ul v-show="open" class="menu" role="listbox">
      <li class="menu-item" @click="handleClick('roadmap')" role="option" :aria-selected="roadmapSelected">
        {{ $t('map_type_btn.default') }}
      </li>
      <li class="menu-item" @click="handleClick('satellite')" role="option" :aria-selected="satelliteSelected">
        {{ $t('map_type_btn.satellite') }}
      </li>
      <li class="menu-item" @click="handleClick('terrain')" role="option" :aria-selected="terrainSelected">
        {{ $t('map_type_btn.terrain') }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ClickOutside } from '@/directives/ClickOutsideDirective'
import MenuOpenIcon from '@/components/shared/icons/MenuOpenIcon'
import ContainedButton from '@/components/shared/ContainedButton'

export default {
  components: { ContainedButton, MenuOpenIcon },

  directives: { ClickOutside },

  props: {
    mapTypeId: {
      type: String,
      default: 'roadmap'
    }
  },

  data() {
    return {
      open: false
    }
  },

  computed: {
    roadmapSelected() {
      return this.mapTypeId === 'roadmap'
    },
    
    satelliteSelected() {
      return this.mapTypeId === 'satellite'
    },
    
    terrainSelected() {
      return this.mapTypeId === 'terrain'
    },
  },

  methods: {
    toggleMenu() {
      this.open = !this.open
    },

    closeMenu() {
      this.open = false
    },

    handleClick(mapTypeId) {
      this.$emit('mapTypeSelected', mapTypeId)
      this.closeMenu()
    }
  }
}
</script>

<style scoped>
#map-type-control {
  position: absolute;
  left: 0;
  bottom: 24px;
  z-index: 1;
  margin: 0 0 5px 8px;
}

.menu-button {
  position: relative;
  display: inline-block;
}

.menu {
  position: absolute;
  bottom: 100%;
  list-style: none;
  width: 100%;
  border-radius: 6px;
  margin: 0;
  padding: 0;
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.06),
    0px 3px 16px rgba(0, 0, 0, 0.04),
    0px 5px 6px rgba(0, 0, 0, 0.06);
  background: #fefefe;
}

.menu-item {
  padding: .6rem .8rem;
  cursor: pointer;
}

.menu-item:first-child {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.menu-item:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.menu-item:hover {
  background: #f6f6f6;
}

.menu-item[aria-selected] {
  color: #5092d3;
}

.label {
  margin-right: 0.3rem;
}
</style>
