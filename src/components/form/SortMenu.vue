<template>
  <div class="sort-menu">
    {{ $t("sort.label") }}
    <select id="sort_by" name="sort_by" @change="updateParams($event)">
      <option
        v-for="(value, option) in sortOptions"
        :key="option"
        :value="value"
        :selected="params.sort_by === value"
      >
        {{ $t(`sort.by.${option}`) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'params',
    event: 'change',
  },

  props: {
    params: {
      type: Object,
      default: () => ({ sort_by: 1 }),
    },

    sortOptions: {
      type: Object,
    },
  },

  methods: {
    updateParams(e) {
      this.$emit('change', { sort_by: +e.target.value })
    }
  },
}
</script>

<style>
select {
  appearance: none;
  border-radius: 6px;
  border: 1px solid rgb(204, 204, 204);
  padding: 3px 24px 3px 6px;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 50%;
}
</style>
