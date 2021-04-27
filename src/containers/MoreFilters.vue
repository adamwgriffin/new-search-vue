<template>
  <MenuButton label="Filters">
    <div class="more-filters-container">
      <div class="row">
        <ListingStatus :params="listingStatusParams" @change="setSearchParams($event)" />
        <OpenHouses :params="openHouseParams" @change="setSearchParams($event)" />
      </div>
      <PropertyTypes :params="propertyTypeParams" @change="setSearchParams($event)" :propertyTypes="propertyTypes" />
      <PropertyInfo :params="propertyInfoParams" @change="setSearchParams($event)" />
      <Features :params="featuresParams" @change="setSearchParams($event)" />
    </div>
  </MenuButton>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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

  computed: {
    ...mapGetters('listingSearch', [
      'moreFiltersParams'
    ]),

    listingStatusParams() {
      return pick(this.moreFiltersParams, ['status', 'ex_pend', 'ex_cs', 'sold_days'])
    },

    openHouseParams() {
      return pick(this.moreFiltersParams, ['openhouse', 'openhouse_virtual', 'exopenhouse_in_person_cs'])
    },

    propertyTypes() {
      return propertyTypes
    },

    propertyTypeParams() {
      return this.moreFiltersParams.ptype
    },

    propertyInfoParams() {
      return pick(
        this.moreFiltersParams,
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
        this.moreFiltersParams,
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
    ...mapMutations('listingSearch', ['setSearchParams']),
  }
}
</script>

<style scoped>
.more-filters-container {
  width: 56vw;
}

.more-filters-container > * {
  margin-bottom: .5rem;
}

@media (min-width: 1025px) {
  .row {
    display: flex;
  }

  .row > *:last-child {
    margin-left: 10rem;
  }
}
</style>
