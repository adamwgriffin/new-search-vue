<template>
  <div id="app">
    <Search />
  </div>
</template>

<script>
import Search from '@/components/Search'

export default {
  name: 'App',
  components: { Search }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
