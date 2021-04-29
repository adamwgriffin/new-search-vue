<template>
  <div id="progress-bar"></div>
</template>

<script>
import "nprogress/nprogress.css"
import * as NProgress from 'nprogress'

export default {
  props: {
    active: {
      type: Boolean
    }
  },

  watch: {
    active(newValueActive) {
      newValueActive ? NProgress.start() : NProgress.done()
    }
  },

  mounted() {
    NProgress.configure({
      parent: '#progress-bar',
      showSpinner: false,
      trickleSpeed: 50
    })
  }
}
</script>

<style scoped>
#progress-bar {
  height: 2px;
}
</style>
