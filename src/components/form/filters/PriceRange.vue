<template>
  <MenuButton
    :label="$t('price_range.heading')"
    :theme="theme"
    :open="open"
    @click="toggleMenu"
    v-click-outside="closeMenu"
  >
    <div class="price-range-row price-inputs-row">
      <FormattedInput
        :value="value.pricemin"
        :formatFunc="formatNumber"
        :unformatFunc="stripFormattingFromNumberString"
        :placeholder="$t('no_min')"
        @input="updateValue('pricemin', $event)"
        @focus="handleFocus('pricemin')"
      >
      </FormattedInput>
      <div class="min-max-separator">
        to
      </div>
      <FormattedInput
        :value="value.pricemax"
        :formatFunc="formatNumber"
        :unformatFunc="stripFormattingFromNumberString"
        :placeholder="$t('no_max')"
        @input="updateValue('pricemax', $event)"
        @focus="handleFocus('pricemax')"
      >
      </FormattedInput>
    </div>
    <div class="price-list-row">
      <div class="price-list-container" :class="{ selected: priceInputSelected === 'pricemin' }">
        <PriceRangeList @click="updateValue('pricemin', $event)" />
      </div>
      <div class="min-max-separator">&nbsp;</div>
      <div class="price-list-container" :class="{ selected: priceInputSelected === 'pricemax' }">
        <PriceRangeList @click="updateValue('pricemax', $event)" />
      </div>
    </div>
  </MenuButton>
</template>

<script>
import { formatNumber, stripFormattingFromNumberString } from '@/lib/helpers/number_formatters'
import menu_open_mixin from '@/mixins/menu_open_mixin'
import MenuButton from '@/components/shared/MenuButton'
import FormattedInput from '@/components/shared/FormattedInput'
import PriceRangeList from '@/components/form/filters/PriceRangeList'

export default {
  mixins: [menu_open_mixin],
  
  components: { MenuButton, FormattedInput, PriceRangeList },

  props: {
    value: {
      type: Object,
      default: () => ({ pricemin: null, pricemax: null })
    }
  },

  data() {
    return {
      priceInputSelected: 'pricemin'
    }
  },

  computed: {
    theme() {
      return { '--menu-button-padding': '0' }
    },
  },

  methods: {
    formatNumber,

    stripFormattingFromNumberString,

    updateValue(priceParam, value) {
      const price = +value || null
      this.$emit('input', { [priceParam]: price })
    },

    handleFocus(priceParam) {
      this.priceInputSelected = priceParam
    }
  }
}
</script>

<style scoped>
.price-range-row {
  display: flex;
  align-items: center;
}

.price-inputs-row {
  padding: 1rem 1rem .4rem 1rem;
}

input {
  width: 14ch;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 11px 16px;
}

.min-max-separator {
  padding: 0 .6rem;
}

.price-list-row {
  display: flex;
  max-height: 250px;
  overflow-y: auto;
  margin: 0 0 1rem 1rem;
}

.price-list-container {
  width: 100%;
  visibility: hidden;
  padding-left: .4rem;
}
.price-list-container.selected {
  visibility: visible;
}
</style>
