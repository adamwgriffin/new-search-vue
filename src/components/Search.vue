<template>
  <div id="search">
    <SearchForm />
    <div class="search-results">
      <PickList />
      <ListingMap />
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm"
import PickList from '@/components/PickList'
import ListingMap from "@/components/ListingMap"

export default {
  components: {
    SearchForm,
    PickList,
    ListingMap,
  }
}
</script>

<style>
#search {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-results {
  display: flex;
  height: 100%;
}
</style>
