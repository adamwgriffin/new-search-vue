<template>
  <LabelContainer>
    <div class="listing-label days-on-market" v-if="daysOnMarket">{{ daysOnMarket }}</div>
    <div class="listing-label open-house-label" v-if="openHouse">{{ openHouse }}</div>
    <div class="listing-label sold-label" v-if="sold">{{ sold }}</div>
    <div class="listing-label virtual-tour-label" v-if="virtualTourLabel">{{ $t('virtual_tour_label') }}</div>
  </LabelContainer>
</template>

<script>
import LabelContainer from '@/components/listings/LabelContainer'
import VirtualTourIcon from '@/components/listings/VirtualTourIcon'

export default {
  components: { LabelContainer, VirtualTourIcon },

  props: {
    daysOnMarket: {
      type: String
    },

    openHouse: {
      type: String
    },

    sold: {
      type: String
    },

    virtualTourLabel: {
      type: Boolean
    },
  }

}
</script>

<style scoped>
.listing-label {
  background: #333333;
  padding: 2px 10px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: white;
}
.days-on-market {
  background: #55b451;
}

.open-house-label {
  background: #e77420;
}

.sold-label {
  background: #d32f2f;
}
</style>
