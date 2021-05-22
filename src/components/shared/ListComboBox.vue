<template>
  <!-- based on https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html -->
  <div class="combobox-wrapper" v-click-outside="closeDropdown">
    <div
      role="combobox"
      :aria-expanded="open"
      :aria-owns="ariaListboxId"
      aria-haspopup="listbox"
      class="combobox-input"
    >
      <input
        aria-autocomplete="list"
        :aria-controls="ariaListboxId"
        :aria-activedescendant="activeDescendant"
        :aria-labelledby="labelledBy"
        :name="name"
        :placeholder="placeholder"
        :value="value"
        pattern="^(\d+|\d+\.\d+)$"
        type="text"
        @input="updateValue($event.target.value)"
        @focus="openDropdown"
        @keyup.space="openDropdown"
        @keydown.tab="closeDropdown"
        @keydown.up.stop="moveUp"
        @keydown.down.stop="moveDown"
        @keyup.esc.stop="closeDropdown"
        @keyup.enter.stop="closeDropdown"
      />
      <MenuOpenIcon :open="open" @click="toggleDropdown" ariaRole="button" />
    </div>
    <ul
      role="listbox"
      tabindex="-1"
      v-show="open"
    >
      <li
        v-for="(option, index) in options"
        role="option"
        :id="`${ariaListboxId}-list-item-${index}`"
        :key="index"
        :class="{active: activeDescendantKey === index}"
        @click.stop="handleMenuItemClick(option)"
      >
        {{ formatMenuItemFuction(option.toString()) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ClickOutside } from '@/directives/ClickOutsideDirective'
import uniqueId from 'lodash/uniqueId'
import MenuOpenIcon from '@/components/shared/MenuOpenIcon'

export default {
  directives: { ClickOutside },

  components: { MenuOpenIcon },

  data () {
    return {
      ariaListboxId: null,
      open: false,
      activeDescendantKey: -1
    }
  },

  props: {
    name: String,

    // this is the value that is passed to the component via v-model="storeProperty"
    value: {
      type: [String, Number]
    },
    
    placeholder: {
      type: String
    },
    
    options: {
      type: Array
    },
    
    formatMenuItemFuction: {
      type: Function,
      default(item) {
        return item
      }
    },

    nonFormattedValue: {
      type: Function,
      default(item) {
        return item
      }
    },
    
    labelledBy: {
      type: String
    }
  },

  created() {
    this.ariaListboxId = uniqueId('listbox-')
  },

  computed: {
    activeDescendant() {
      return this.activeDescendantKey > -1 ? `${this.ariaListboxId}-list-item-${this.activeDescendantKey}` : '';
    },
  },

  methods: {
    moveDown() {
      this.openDropdown();
      if (this.activeDescendantKey < this.options.length - 1) {
        this.activeDescendantKey++;
        this.updateValue(this.options[this.activeDescendantKey]);
      }
    },

    moveUp() {
      this.openDropdown();
      if (this.activeDescendantKey > 0) {
        this.activeDescendantKey--;
        this.updateValue(this.options[this.activeDescendantKey]);
      }
    },

    handleMenuItemClick(option) {
      this.updateValue(option)
      this.open = false
    },

    openDropdown() {
      this.open = true
    },

    closeDropdown() {
      this.open = false;
    },

    toggleDropdown() {
      this.open = !this.open;
    },

    updateValue(value) {
      /* propogate the updated input back to the parent component using $emit other components that are bound to the
      same model will get the change */
      this.$emit('input', this.nonFormattedValue(value))
    }

  }
};
</script>

<style scoped>
.combobox-wrapper {
  position: relative;
}

.combobox-input {
  display: flex;
  border-radius: 6px;
  margin: 1px;
  border: 1px solid #cccccc;
  padding: 9.6px 16px;
}

.combobox-input:focus-within {
  margin: 0;
  border: 2px solid #0773f8;
}

input {
  /* need to set width: 100% otherwise input will not shrink in flex container */
  width: 100%;
  border: none;
  padding: 0;
}

input:focus { outline: none; }

ul {
  position: absolute;
  z-index: 1;
  overflow-x: hidden;
  list-style: none;
  background-color: white;
  width: 100%;
  max-height: 250px;
  box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;
}

li {
  padding: 12px;
  cursor: pointer;
}

li:hover,
li.active {
  background-color: #f6f6f6;
}
</style>
