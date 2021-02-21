<template>
  <MenuButton label="Filters">
    <ListingStatus :params="listingStatusParams" @change="updateValue($event)" />
    <OpenHouses :params="openHouseParams" @change="updateValue($event)" />
  </MenuButton>
</template>

<script>
import pick from 'lodash/pick'
import MenuButton from '@/components/shared/MenuButton'
import ListingStatus from '@/components/form/filters/ListingStatus'
import OpenHouses from '@/components/form/filters/OpenHouses'

export default {
  components: { MenuButton, ListingStatus, OpenHouses },

  /* this is for use with v-model. when used with custom components, the default for v-model is to pass state changes
  down to a prop named "value" and listen for "input" events from the component to propgate it's changes up to the
  state. you can override these defaults by setting "prop" and/or "event" in this "model" property. here we're changing
  the default prop, "value", to be called "searchParams", because the name makes more sense for this component. we are
  overriding the default "input" event to instead be "change" since that's what we listen to on native checkboxes and
  radio buttons. */
  model: {
    prop: 'searchParams',
    event: 'change'
  },

  props: {
    searchParams: Object
  },

  computed: {
    listingStatusParams() {
      return pick(this.searchParams, ['status', 'ex_pend', 'ex_cs', 'sold_days'])
    },

    openHouseParams() {
      return pick(this.searchParams, ['openhouse', 'openhouse_virtual', 'exopenhouse_in_person_cs'])
    },
  },

  methods: {
    updateValue(e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style scoped>
</style>
