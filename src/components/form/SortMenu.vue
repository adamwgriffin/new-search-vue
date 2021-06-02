<template>
  <div class="sort-menu menu-button" v-click-outside="closeMenu">
    <div class="button" @click="toggleMenu">
      {{ buttonLabelText }} <CaretDownIcon class="menu-icon" :class="menuIconClasses" />
    </div>
    <ul v-show="open" class="menu">
      <li
        v-for="(value, option) in sortOptions"
        :key="option"
        :class="{ selected: params.sort_by === value }"
        class="menu-item"
        @click="updateParams(value)"
      >
        <CheckIcon class="menu-item-selection" />
        <div class="menu-item-label">
          {{ $t(`sort.by.${option}`) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ClickOutside } from '@/directives/ClickOutsideDirective'
import CaretDownIcon from '@/components/shared/icons/CaretDownIcon'
import CheckIcon from '@/components/shared/icons/CheckIcon'

export default {
  model: {
    prop: 'params',
    event: 'change',
  },

  directives: { ClickOutside },

  components: {
    CaretDownIcon,
    CheckIcon
  },

  props: {
    params: {
      type: Object,
      default: () => ({ sort_by: 1 }),
    },

    sortOptions: {
      type: Object,
    }
  },

  data() {
    return {
      open: false
    }
  },

  computed: {
    sortType() {
      return Object.keys(this.sortOptions).find(key => this.sortOptions[key] === this.params.sort_by)
    },

    buttonLabelText() {
      return this.$t("sort.label") + ' ' + this.$t(`sort.by.${this.sortType}`)
    },

    menuIconClasses() {
      return { open: this.open }
    }
  },

  methods: {
    toggleMenu() {
      this.open = !this.open
    },

    closeMenu() {
      this.open = false
    },

    updateParams(value) {
      this.$emit('change', { sort_by: value })
      this.closeMenu()
    }
  }
}
</script>

<style scoped>
.menu-button {
  position: relative;
  display: inline-block;
}

.button {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
}

.menu {
  position: absolute;
  right: 0;
  z-index: 1;
  min-width: 100%;
  width: 160px;
  border-radius: 6px;
  margin-top: 3px;
  padding: 0;
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.06),
    0px 3px 16px rgba(0, 0, 0, 0.04),
    0px 5px 6px rgba(0, 0, 0, 0.06);
  background: #fefefe;
}

.menu-icon {
  display: flex;
  align-items: center;
  user-select: none;
  transform: rotate(0deg);
  transition: transform 150ms linear;
  margin-left: .6rem;
}
.menu-icon.open {
  transform: rotate(180deg);
  transition: transform 150ms linear;
}

.menu-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  list-style: none;
  margin: 0;
  padding: .6rem;
}
.menu-item:hover,
.menu-item.active {
  background-color: #f6f6f6;
}

.menu-item.selected {
  font-weight: 600;
}

.menu-item-selection {
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: .3rem;
}
.menu-item.selected .menu-item-selection {
  visibility: visible;
}

.menu-item-label {
  flex-shrink: 0;
}
</style>
