<template>
  <span class="text-field" :class="textFieldClasses">
    <i class="leading-icon">
      $
    </i>
    <input
      type="text"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
      @focus="toggleFocus"
      @blur="toggleFocus"
    >
    <i class="trailing-icon" @click="clearInput">
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
  white-space: nowrap;
  align-items: center;
  border: 1px solid rgba(51, 51, 51, 0.38);
  border-radius: 8px;
  padding: 8px;
}

.text-field.has-focus {
  border: 1px solid #0457AF;
}

i {
  font-style: normal;
  color: rgba(51, 51, 51, 0.38);
}

.trailing-icon {
  cursor: pointer;
}

input {
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
