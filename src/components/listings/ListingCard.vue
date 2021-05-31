<template>
  <div class="listing-card">
    <div
      class="listing-image"
      :style="listingCardBackgroundImage"
    >
      <div class="listing-image-info">
        <div class="price">{{ listingPrice | currency }}</div>
      </div>
    </div>
    <div class="listing-info">
      <div class="meta-container">
        <div class="meta-info">
          {{ metaInfo }}
        </div>
        <div class="contact">
          <button class="contact-button">Contact Agent</button>
        </div>
      </div>
      <address class="address" v-if="listing.location.address">
        {{ address }}
      </address>
      <div v-else>Address Not Available</div>
      <div class="status">{{ listing.status }}</div>
    </div>
    <div class="credit" v-if="!listing.do_not_show">
      <img v-if="listing.mlslogourl_small" :src="listing.mlslogourl_small" />
      {{ listing.credit }}
    </div>
  </div>
</template>

<script>
import { listingCardMetaInfo } from '@/lib/helpers/listing_helpers'

export default {
  props: {
    listing: {
      type: Object,
      required: true
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

    metaInfo() {
      return listingCardMetaInfo(this.listing)
    },

    bathrooms() {
      const { bathroom_details, bathrooms } = this.listing
      return bathroom_details.bathrooms_display || bathroom_details.total_bathrooms || bathrooms
    },

    address() {
      const { address, city, state, zip } = this.listing.location
      return [
        `${address} ${city}`.trim(),
        `${state} ${zip}`.trim()
      ]
        .filter(a => a)
        .join(', ')
    }
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
.listing-card {
  height: 350px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.listing-image {
  position: relative;
  height: 220px;
  background-repeat: no-repeat;
  background-size: cover;
}

.listing-image-info {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.4rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}

.price {
  font-size: 24px;
  text-shadow: 1px 1px #333;
  font-weight: 100;
  color: white;
}

.listing-info {
  flex-grow: 1;
  padding: .5rem;
  background: white;
  font-size: 14px;
  border-bottom: 3px solid #000;
}

.meta-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.meta-info {
  font-size: 15px;
  font-weight: 600;
}

.address {
  font-style: normal;
  font-size: 14px;
  margin-bottom: 4px;
}

.contact-button,
.status,
.credit {
  font-size: 12px;
}

.contact-button {
  white-space: nowrap;
  background: inherit;
  border: 1px solid #909090;
  border-radius: 3px;
  padding: 4px;
  cursor: pointer;
  font-weight: normal;
  color: inherit;
  font-family: inherit;
}
.contact-button:hover {
  background: #f5f5f5;
}

.credit {
  color: #909090;
  height: 30px;
  padding: .3rem .3rem 0 .3rem;
  text-align: right;
}

.credit img {
  max-height: 12px;
  max-width: 80px;
}
</style>
