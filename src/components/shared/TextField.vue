<template>
  <span class="text-field" :class="textFieldClasses">
    <i><slot></slot></i>
    <input
      type="text"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
      @focus="toggleFocus"
      @blur="toggleFocus"
      :value="value"
    >
    <i class="clear-button" :class="trailingIconClasses" title="Clear field" @click="clearInput">
      ×
    </i>
  </span>
</template>

<script>
export default {
  props: {
    // this is the value that is passed to the component via v-model
    value: {
      default: null
    },

    placeholder: {
      type: String
    },

    name: {
      type: String
    },

    ariaLabelledby: {
      type: String
    }
  },

  data() {
    return {
      hasFocus: false
    }
  },

  computed: {
    textFieldClasses() {
      return { 'has-focus': this.hasFocus }
    },

    trailingIconClasses() {
      return { visible: this.value }
    }
  },

  methods: {
    updateValue(value) {
      // propagate the updated input back to the parent component using $emit. other components that are bound to the
      // same model with v-model will get the change
      this.$emit('input', value)
    },

    clearInput() {
      this.$emit('input', null);
    },
    
    toggleFocus() {
      this.hasFocus = !this.hasFocus
    }
  }
}
</script>

<style scoped>
.text-field {
  display: inline-block;
  white-space: nowrap;
  align-items: center;
  border: 1px solid rgba(51, 51, 51, 0.38);
  border-radius: 8px;
  padding: 10px;
}

.text-field.has-focus {
  border: 1px solid #0457AF;
}

i {
  font-style: normal;
  font-size: 16px;
  color: rgba(51, 51, 51, 0.38);
}

.clear-button {
  cursor: pointer;
  visibility: hidden;
}

.clear-button.visible {
  visibility: visible;
}

input {
  width: 10ch;
  border: none;
  font-size: 14px;
  color: inherit;
  font-family: inherit;
}

input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgba(51, 51, 51, 0.38);
}

input:focus {
  outline: none;
}
</style>
