<template>
  <div class="search-form">
    <form autocomplete="off">
      <SearchField />
    </form>
  </div>
</template>

<script>
import SearchField from '@/components/SearchField'

export default {
  components: { SearchField }
}
</script>

<style scoped>
form {
  padding: 1rem;
  border-bottom: solid 1px gray;
}
</style>
