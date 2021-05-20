<template>
  <span class="places-prediction-text">
    <span class="main-text">
      <span v-for="(string, index) in mainTextSubstrings"
        :key="index"
        :class="{ matched: string.match }"
      >{{ string.text }}</span>
    </span>
    <span class="secondary-text">
      {{ prediction.structured_formatting.secondary_text }}
    </span>
  </span>
</template>

<script>
import uniq from 'lodash/uniq'

export default {
  props: {
    prediction: {
      type: Object,
      required: true,
    }
  },

  computed: {
    mainTextSubstrings() {
      const { main_text_matched_substrings, main_text } = this.prediction.structured_formatting
      return this.getSubStringObjs(main_text_matched_substrings, main_text)
    }
  },

  methods: {
    getSubStringObjs(matches, str) {
      const matchOffsets = matches.flatMap(({ offset, length }) => [offset, offset+length])
      const allOffsets = uniq([0, ...matchOffsets, str.length])
      const allOffsetPairs = allOffsets.slice(1).map((end, i) => [allOffsets[i], end])
      return allOffsetPairs.map(([start, end]) => {
        const text = str.substring(start, end)
        const match = !!matches.find(({ offset, length }) => (offset === start && offset+length === end))
        return { text, match }
      })
    }
  }
}
</script>

<style>
.matched {
  color: black;
  font-weight: 700;
}

.secondary-text {
  color: #999;
}
</style>
