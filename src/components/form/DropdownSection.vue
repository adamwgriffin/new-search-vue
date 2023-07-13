<template>
  <li>
    <div class="list-item-header list-item">
      <strong>{{ header }}</strong>
    </div>
    <div
      v-for="(option) in options"
      role="option"
      :id="`${ariaListboxId}-list-item-${option.place_id}`"
      :key="option.place_id"
      class="list-item"
      :class="{ active: activeDescendantKey === option.index }"
      @click.stop="handleMenuItemClick(option)"
    >
      <slot></slot>
      <PlacesPredictionText :prediction="option" />
    </div>
  </li>
</template>

<script>
  import PlacesPredictionText from "@/components/shared/PlacesPredictionText";

  export default {
    components: {
      PlacesPredictionText
    },

    props: {
      header: {
        type: String,
      },

      options: {
        type: Array,
        required: true,
      },

      ariaListboxId: {
        type: String,
      },

      activeDescendantKey: {
        type: Number,
      },
    },

    methods: {
      handleMenuItemClick(option) {
        this.$emit("click", option);
      }
    },
  };
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: flex-start;
  padding: 0.6rem;
  cursor: pointer;
}

.list-item:hover,
.list-item.active {
  background-color: #f6f6f6;
}

.list-item.active .dropdown-icon {
  fill: #e96262;
}


.dropdown-icon {
  margin-right: 0.3rem;
}
</style>
