<template>
  <div
    class="listing-image"
    :style="listingCardBackgroundImage"
  >
    <ListingCardLabels
      :listing="listing"
      :noMlsDom="noMlsDom"
      :showVirtualTourIcon="showVirtualTourIcon"
    />
    <div class="gallery-controls">
      <LeftChevronIcon />
      <RightChevronIcon />
    </div>
    <div class="listing-info">
      <div class="price">{{ listingPrice | currency }}</div>
      <div class="listing-image-buttons">
        <FavoriteListing />
      </div>
    </div>
  </div>
</template>

<script>
import ListingCardLabels from '@/components/listings/ListingCardLabels'
import LeftChevronIcon from '@/components/shared/icons/LeftChevronIcon'
import RightChevronIcon from '@/components/shared/icons/RightChevronIcon'
import FavoriteListing from '@/components/listings/FavoriteListing'

export default {
  components: {
    ListingCardLabels,
    LeftChevronIcon,
    RightChevronIcon,
    FavoriteListing
  },
  props: {
    listing: {
      type: Object,
      required: true
    },

    noMlsDom: {
      type: Array,
      default: () => [] 
    },

    showVirtualTourIcon: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    listingCardBackgroundImage() {
      return {
        backgroundImage: `url('${this.listing.image[0].small_url}')`
      }
    },

    listingPrice() {
      return this.listing.status === 'Sold' ? this.listing.sold_price : this.listing.list_price
    },
  },

  methods: {

  },

  filters: {
    currency(value) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      })
      return formatter.format(value)
    }
  }
}
</script>

<style scoped>
.listing-image {
  display: flex;
  flex-direction: column;
  height: 220px;
  background-repeat: no-repeat;
  background-size: cover;
}

.listing-image:hover .gallery-controls {
  visibility: visible;
}

.gallery-controls {
  visibility: hidden;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
}

.listing-info {
  display: flex;
  padding: 0.4rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}

.price {
  flex-grow: 1;
  font-family: Arial, sans-serif;
  font-size: 24px;
  text-shadow: 1px 1px #333;
  font-weight: 100;
  color: white;
}
</style>
