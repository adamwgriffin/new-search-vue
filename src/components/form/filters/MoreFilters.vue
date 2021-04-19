<template>
  <MenuButton label="Filters">
    <div class="more-filters-container">
      <ListingStatus :params="listingStatusParams" @change="updateValue($event)" />
      <OpenHouses :params="openHouseParams" @change="updateValue($event)" />
      <PropertyTypes :params="propertyTypeParams" @change="updateValue($event)" :propertyTypes="propertyTypes" />
      <PropertyInfo :params="propertyInfoParams" @change="updateValue($event)" />
      <Features :params="featuresParams" @change="updateValue($event)" />
    </div>
  </MenuButton>
</template>

<script>
import pick from 'lodash/pick'
import MenuButton from '@/components/shared/MenuButton'
import ListingStatus from '@/components/form/filters/ListingStatus'
import OpenHouses from '@/components/form/filters/OpenHouses'
import PropertyTypes from '@/components/form/filters/PropertyTypes'
import PropertyInfo from '@/components/form/filters/PropertyInfo'
import Features from '@/components/form/filters/Features'
import { propertyTypes } from '@/lib/constants/property_types'

export default {
  components: {
    MenuButton,
    ListingStatus,
    OpenHouses,
    PropertyTypes,
    PropertyInfo,
    Features,
  },

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

    propertyTypes() {
      return propertyTypes
    },

    propertyTypeParams() {
      return this.searchParams.ptype
    },

    propertyInfoParams() {
      return pick(
        this.searchParams,
        [
          'sqft_min',
          'sqft_max',
          'ls_conversion',
          'lotsize_min',
          'lotsize_max',
          'yearblt_min',
          'yearblt_max',
          'days_indb',
        ]
      )
    },

    featuresParams() {
      return pick(
        this.searchParams,
        [
          'water',
          'view',
          'onestory',
          'has_garage',
          'new_const',
          'virtual_tour',
          'has_pool',
          'senior_community',
        ]
      )
    }
  },

  methods: {
    updateValue(e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style scoped>
.more-filters-container {
  width: 55vw;
}

.more-filters-container > * {
  margin-bottom: .5rem;
}
</style>
