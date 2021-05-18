<template>
  <div
    id="search-field"
    class="combobox-wrapper"
    :class="searchFieldClasses"
    v-click-outside="closeDropdown"
  >
    <div class="search-field-elements">
      <div
        class="combobox-input"
        role="combobox"
        :aria-expanded="open"
        :aria-owns="ariaListboxId"
        aria-haspopup="listbox"
      >
        <input
          id="location-search-field"
          name="location-search-field"
          aria-label="Location Search"
          aria-autocomplete="list"
          :aria-controls="ariaListboxId"
          :aria-activedescendant="activeDescendant"
          :placeholder="placeholder"
          :value="value"
          type="text"
          @input="handleInput($event.target.value)"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown.tab="closeDropdown"
          @keydown.up.stop="moveUp"
          @keydown.down.stop="moveDown"
          @keyup.esc.stop="closeDropdown"
          @keyup.enter.stop="handleEnter"
        />
        <DriveTimeButton @click="openDriveTimeMenu" />
      </div>
      <SearchButton @click="handSearchButtonClicked" />
    </div>
    <ul v-show="open" class="menu" role="listbox" tabindex="-1">
      <li
        v-for="(option, index) in options"
        role="option"
        :id="`${ariaListboxId}-list-item-${index}`"
        :key="option.place_id"
        class="menu-item"
        :class="{ active: activeDescendantKey === index }"
        @click.stop="handleMenuItemClick(option)"
      >
        {{ option.description }}
      </li>
    </ul>
  </div>
</template>

<script>
  import { ClickOutside } from '@/directives/ClickOutsideDirective'
  import uniqueId from 'lodash/uniqueId'
  import SearchButton from '@/components/form/SearchButton'
  import DriveTimeButton from '@/components/form/DriveTimeButton'

  export default {
    directives: { ClickOutside },

    components: { DriveTimeButton, SearchButton, },

    props: {
      value: {
        type: String,
        default: null
      },
      
      placeholder: {
        type: String
      },

      options: {
        type: Array,
        required: true,
        default: () => []
      },
    },

    data () {
      return {
        open: false,
        inputHasFocus: false,
        ariaListboxId: null,
        activeDescendantKey: -1,
      }
    },

    created() {
      this.ariaListboxId = uniqueId('listbox-')
    },

    watch: {
      options() {
        this.options.length ? this.openDropdown() : this.closeDropdown()
      },
    },

    computed: {
      searchFieldClasses() {
        return { 'input-has-focus': this.inputHasFocus }
      },

      activeDescendant() {
        return this.activeDescendantKey > -1 ?
          `${this.ariaListboxId}-list-item-${this.activeDescendantKey}` : ''
      },
    },

    methods: {
      openDropdown() {
        this.open = true
      },

      closeDropdown() {
        this.open = false
      },

      moveDown() {
        this.openDropdown()
        if (this.activeDescendantKey < this.options.length - 1) {
          this.activeDescendantKey++
        }
      },

      moveUp() {
        this.openDropdown();
        if (this.activeDescendantKey > 0) {
          this.activeDescendantKey--
        }
      },

      handleFocus() {
        this.inputHasFocus = true
        this.options.length && this.openDropdown()
      },

      handleBlur() {
        this.inputHasFocus = false
      },

      handleMenuItemClick(option) {
        this.$emit('optionSelected', option)
        this.closeDropdown()
      },

      handleEnter() {
        this.$emit('optionSelected', this.options[this.activeDescendantKey])
        this.closeDropdown()
        this.activeDescendantKey = -1
      },

      handleInput(value) {
        this.$emit('input', value)
      },

      handSearchButtonClicked(e) {
        this.$emit('searchButtonClicked')
        this.closeDropdown()
      },

      openDriveTimeMenu() {},
    },
  }
</script>

<style scoped>
  .combobox-wrapper {
    flex-grow: 1;
    position: relative;
  }

  .search-field-elements {
    display: flex;
    width: 100%;
  }

  .combobox-input,
  input {
    background: #f6f6f6;
  }

  .combobox-input {
    flex-grow: 1;
    display: flex;
    border-radius: 6px 0 0 6px;
    /* the margin stops content from moving around when focus ring is active */
    padding: 1px;
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc; 
    border-bottom: 1px solid #cccccc;
  }

  .input-has-focus .combobox-input {
    padding: 0;
    border: 2px solid #0773f8;
  }

  .input-has-focus #drive-time-menu-button {
    /* stops the focus ring border from moving the drive time button */
    margin-right: 1px;
  }

  input {
    /* need to set width: 100% otherwise input will not shrink in flex container */
    width: 100%;
    border: none;
    padding-left: 10px;
    font-size: 16px;
    font-family: inherit;
    color: inherit;
    height: 36px;
    border-radius: 6px 0 0 6px;
  }

  input:focus { outline: none; }

  .menu {
    position: absolute;
    z-index: 1;
    overflow-x: hidden;
    list-style: none;
    background-color: white;
    width: 100%;
    max-height: 250px;
    box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
    margin: 0;
    padding: 8px 0;
  }

  .menu-item {
    padding: 8px 14px;
    cursor: pointer;
  }

  .menu-item:hover,
  .menu-item.active {
    background-color: #f6f6f6;
  }
</style>
