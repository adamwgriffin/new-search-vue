<template>
  <div id="app">
    <Search :environment="environment"/>
  </div>
</template>

<script>
import Search from '@/containers/Search'

export default {
  components: { Search },

  computed: {
    environment() {
      return {
        serviceBase: process.env.VUE_APP_SERVICE_BASE,
        serviceVersion: process.env.VUE_APP_SERVICE_VERSION,
        company_uuid: +process.env.VUE_APP_COMPANY_UUID,
      }
    },
  }
}
</script>

<style>
html, body {
  /* height: 100%; is necessary here for so that #app will be 100% */
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

#app {
  /* height: 100% is necessary to make this element 100%, & display: flex allows it's child's height to also be 100% */
  display: flex;
  height: 100%;
  font-family: "Open Sans", Hevetica, Verdana, Arial, sans-serif;
  font-size: 14px;
  color: #212e35;
}
</style>
