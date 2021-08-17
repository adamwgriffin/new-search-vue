<template>
  <div class="container">
    <template v-for="option in options">
      <input
        type="radio"
        :name="name"
        :value="option.value"
        :id="`${name}_${option.value}`"
        :key="`${name}-radio-${option.value}`"
        :checked="option.value === checkedOption"
        @change="updateValue(option.value)"
      >
      <label :for="`${name}_${option.value}`" :key="`${name}-label-${option.value}`">
        {{ option.label }}
      </label>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },

    value: {
      default: 0
    },

    options: {
      type: Array
    }
  },

  computed: {
    checkedOption() { return this.value }
  },

  methods: {
    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.04),
    0px 2px 2px rgba(0, 0, 0, 0.02),
    0px 1px 3px rgba(0, 0, 0, 0.06);
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 48px;
  height: 40px;
  font-size: 14px;
  border-left: 1px solid #e7e7e7;
}

label:first-of-type {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

label:last-of-type {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

label:hover {
  background: #F6F6F6;
}

input {
  position: absolute;
  opacity: 0;
  margin: 0;
}

input[type=radio]:checked + label{
  background: #5092d3;
  color: white;
}
</style>
