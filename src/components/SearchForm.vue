<template>
  <div class="search-form">
    <form autocomplete="off">
      <SearchField />
      <SearchButton />
    </form>
  </div>
</template>

<script>
import SearchField from '@/components/SearchField'
import SearchButton from '@/components/SearchButton'

export default {
  components: { SearchField, SearchButton }
}
</script>

<style scoped>
form {
  padding: 1rem;
  border-bottom: solid 1px gray;
}
</style>
