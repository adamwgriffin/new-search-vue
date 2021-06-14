<template>
  <ListingLabel
    :daysOnMarket="daysOnMarket"
    :openHouse="openHouse"
    :sold="sold"
    :virtualTourLabel="virtualTourPresent"
  />
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import ListingLabel from "@/components/listings/ListingLabel"

export default {
  components: { ListingLabel },

  props: {
    listing: {
      type: Object,
      required: true
    },

    noMlsDom: {
      type: Array,
      required: true
    },

    showVirtualTourIcon: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    mlsAllowsDaysOnMarket() {
      return !this.noMlsDom.includes(parseInt(this.listing.mlsid))
    },

    activeWithinTheLastWeek() {
      return this.listing.status !== "Sold" && this.daysBetweenDates(this.listing.listed_date) <= 7
    },

    showDaysOnMarket() {
      return this.mlsAllowsDaysOnMarket && this.activeWithinTheLastWeek
    },

    daysOnMarketText() {
      const n = this.daysBetweenDates(this.listing.listed_date)
      switch (n) {
        case 0:
          return this.$t('days_on_market.new')
        default:
          return this.$t('days_on_market.days_ago', { n })
      }
    },

    daysOnMarket() {
      if (this.showDaysOnMarket) return this.daysOnMarketText
    },

    openHouse() {
      // the listing detail openhouse attribute passed in by the ListingOverly is an array instead of a string, like
      // the others. isEmpty should cover both strings & arrays, as well as null
      if (!isEmpty(this.listing.openhouse)) return this.$t('open_house.card_label')
    },

    sold() {
      if (this.listing.status === 'Sold') return `${this.listing.status_name_for_view} on ${this.listing.sold_date}`
    },

    virtualTourPresent() {
      if (this.showVirtualTourIcon) return !!this.listing.virtual_tour_url
    } 
  },

  methods: {
    getToday() {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth()+1 //January is 0!
      let yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0'+dd
      }
      if (mm < 10) {
        mm = '0'+mm
      }
      today = mm + '/' + dd + '/' + yyyy
      return today
    },

    daysBetweenDates(d) {
      const dayStart = new Date(d)
      const dayEnd = new Date(this.getToday())
      const totalDays = (dayEnd - dayStart) / (1000 * 60 * 60 * 24)
      return Math.round(totalDays)
    }
  }
}
</script>

<style scoped>
.days-on-market,
.open-house-label,
.sold-label {
  padding: 5px 10px;
  text-transform: uppercase;
  font-size: 12px !important;
  color: #fff !important;
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
