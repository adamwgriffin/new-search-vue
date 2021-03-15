import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

// minimumFractionDigits & maximumFractionDigits combined remove decimals, e.g., 100,000.20 -> 100,000 
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  },
  'fr-CA': {
    currency: {
      style: 'currency',
      // amounts are actually USD but using "CAD" works around the fact that USD displays as "100 $ US" in French
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  }
}

export default new VueI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  // without this it logs every single translation that falls back to 'en-US' when there is no spcecific 'en-CA'
  // translation available, which is a lot of warnings
  silentFallbackWarn: true,
  numberFormats,
  messages: loadLocaleMessages()
})
