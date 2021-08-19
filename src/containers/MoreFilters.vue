<template>
  <MenuButton
    label="Filters"
    :theme="theme"
    :open="open"
    @click="toggleMenu"
    v-click-outside="closeMenu"
  >
    <div class="more-filters-container">
      <div class="header">
        <ListingStatus :params="listingStatusParams" @change="setSearchParams($event)" />
        <OpenHouses :params="openHouseParams" @change="setSearchParams($event)" />
      </div>
      <div class="main-content">
        <PropertyTypes
          :params="propertyTypeParams"
          :propertyTypes="propertyTypes"
          @change="setSearchParams($event)"
        />
        <PropertyInfo :params="propertyInfoParams" @change="setSearchParams($event)" />
        <Features :params="featuresParams" @change="setSearchParams($event)" />
      </div>
      <div class="footer">
        <ResetFilters @click="resetFilters" />
        <ApplyFilters @cancelClicked="closeMenu" @applyClicked="handleApplyClicked" />
      </div>
    </div>
  </MenuButton>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import pick from 'lodash/pick'
import MenuButton from '@/components/shared/MenuButton'
import ListingStatus from '@/components/form/filters/ListingStatus'
import OpenHouses from '@/components/form/filters/OpenHouses'
import PropertyTypes from '@/components/form/filters/PropertyTypes'
import PropertyInfo from '@/components/form/filters/PropertyInfo'
import Features from '@/components/form/filters/Features'
import ResetFilters from '@/components/form/filters/ResetFilters'
import ApplyFilters from '@/components/form/filters/ApplyFilters'
import { propertyTypes } from '@/lib/constants/property_types'
import menu_open_mixin from '@/mixins/menu_open_mixin'

export default {
  mixins: [menu_open_mixin],

  components: {
    MenuButton,
    ListingStatus,
    OpenHouses,
    PropertyTypes,
    PropertyInfo,
    Features,
    ResetFilters,
    ApplyFilters
  },

  computed: {
    ...mapGetters('listingSearch', [
      'moreFiltersParams'
    ]),

    theme() {
      return {
        '--menu-button-menu-position-left': '50%',
        '--menu-button-menu-position-right': 'auto',
        '--menu-button-menu-position-trasform': 'translateX(-75%)'
      }
    },

    listingStatusParams() {
      return pick(this.moreFiltersParams, ['status', 'ex_pend', 'ex_cs', 'sold_days'])
    },

    openHouseParams() {
      return pick(this.moreFiltersParams, ['openhouse', 'openhouse_virtual', 'openhouse_in_person'])
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
    ...mapMutations('listingSearch', [
      'setSearchParams',
      'setSearchParamsToDefault'
    ]),

    handleApplyClicked() {
      this.closeMenu()
      this.$emit('searchInitiated')
    },

    resetFilters() {
      this.closeMenu()
      this.setSearchParamsToDefault()
      this.$emit('searchInitiated')
    }
  }
}
</script>

<style scoped>
.more-filters-container {
  width: 650px;
}

.header {
  background: #f6f6f6;
  padding: 1rem 1rem .5rem 1rem;
}

.main-content {
  padding: 1rem 1rem 0 1rem;
}

.main-content > * {
  margin-bottom: .5rem;
}

.main-content > *:last-child {
  margin-bottom: 0;
}

.header {
  display: flex;
}

.header > * {
  width: 50%;
}

.footer {
  display: flex;
}

.footer > *:first-child {
  flex-grow: 1;
}
</style>
