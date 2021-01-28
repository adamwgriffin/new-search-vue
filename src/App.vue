<template>
  <div id="app">
    <Search :serviceBase="serviceBase" :serviceVersion="serviceVersion" />
  </div>
</template>

<script>
import Search from '@/components/Search'

export default {
  components: { Search },

  computed: {
    serviceBase: () => process.env.VUE_APP_SERVICE_BASE,

    serviceVersion: () => process.env.VUE_APP_SERVICE_VERSION
  }
}
</script>

<style>
html, body {
  /* height: 100%; is necessary here for so that #app will be 100% */
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  /* height: 100% is necessary to make this element 100%, & display: flex allows it's child's height to also be 100% */
  display: flex;
  height: 100%;
}
</style>
