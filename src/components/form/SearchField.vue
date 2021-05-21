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
          @keyup.esc.stop="handleEscape"
          @keyup.enter.stop="handleEnter"
        />
        <DriveTimeButton @click="openDriveTimeMenu" />
      </div>
      <SearchButton @click="handSearchButtonClicked" />
    </div>
    <ul v-show="open" class="listbox-menu" role="listbox" tabindex="-1">
      <li
        v-for="(option, index) in options"
        role="option"
        :id="`${ariaListboxId}-list-item-${index}`"
        :key="option.place_id"
        class="list-item"
        :class="{ active: activeDescendantKey === index }"
        @click.stop="handleMenuItemClick(option)"
      >
        <LocationPinFilledIcon />
        <PlacesPredictionText :prediction="option" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { ClickOutside } from '@/directives/ClickOutsideDirective'
  import uniqueId from 'lodash/uniqueId'
  import SearchButton from '@/components/form/SearchButton'
  import DriveTimeButton from '@/components/form/DriveTimeButton'
  import LocationPinFilledIcon from '@/components/shared/icons/LocationPinFilledIcon'
  import PlacesPredictionText from '@/components/shared/PlacesPredictionText'

  // the input with dropdown menu part of this components is based on the w3c's guide for building an accessible
  // combobox with listingox popup at:
  // https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html
  export default {
    directives: { ClickOutside },

    components: {
      DriveTimeButton,
      SearchButton,
      LocationPinFilledIcon,
      PlacesPredictionText,
    },

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
      this.ariaListboxId = uniqueId('search-listbox-')
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

      listItemSelected() {
        return this.activeDescendantKey > -1 && this.activeDescendantKey < this.options.length
      },

      // this is used for the aria-activedescendant attribute. it identifies the currently selected item in the dropdown
      // menu for accessibility purposes.
      activeDescendant() {
        return this.listItemSelected ? `${this.ariaListboxId}-list-item-${this.activeDescendantKey}` : null
      },
    },

    methods: {
      openDropdown() {
        if (!this.open) this.open = true
      },

      closeDropdown() {
        if (this.open) this.open = false
      },

      moveUp() {
        this.openDropdown();
        if (this.activeDescendantKey > -1) this.activeDescendantKey--
      },

      // activeDescendantKey is allowed to be incremented to values that are one step beyond the actual indexes of the
      // this.options array. this allows the user to move the selection down past the last item with the arrow key,
      // which causes notting to be selected, but then move the selection back up to select that last item again. this
      // is how google's own autocomplete widget behaves, so I've mimicked that behavior with this.
      moveDown() {
        this.openDropdown()
        if (this.activeDescendantKey < this.options.length) this.activeDescendantKey++
      },

      handleFocus(e) {
        this.inputHasFocus = true
        e.target.select()
        if (this.options.length) this.openDropdown()
      },

      handleEscape() {
        this.closeDropdown()
        this.deselectListItem()

      },

      handleBlur() {
        this.inputHasFocus = false
      },

      handleMenuItemClick(option) {
        this.$emit('optionSelected', option)
        this.closeDropdown()
      },

      handleEnter() {
        if (this.listItemSelected) {
          this.$emit('optionSelected', this.options[this.activeDescendantKey])
          this.closeDropdown()
          this.deselectListItem()
        } else {
          this.$emit('searchInitiated')
          this.closeDropdown()
        }
      },

      handleInput(value) {
        this.$emit('input', value)
      },

      handSearchButtonClicked() {
        this.$emit('searchInitiated')
        this.closeDropdown()
      },

      deselectListItem() {
        this.activeDescendantKey = -1
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

  .listbox-menu {
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

  .list-item {
    display: flex;
    align-items: flex-start;
    padding: 8px;
    cursor: pointer;
  }

  .list-item:hover,
  .list-item.active {
    background-color: #f6f6f6;
  }

  .location-pin-filled-icon {
    margin-right: .3rem;
  }
</style>
