<template>
  <div id="search">
    <div class="search-results">
      <SearchForm />
      <PickList />
    </div>
    <ListingMap />
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
  height: 100%;
}

.search-results {
  width: 65%;
  height: 100%;
}
</style>
