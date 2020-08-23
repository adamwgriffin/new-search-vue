<template>
  <div id="search">
    <SearchForm />
    <div class="search-results">
      <PickList />
      <ListingMapComponent />
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm"
import PickList from '@/components/PickList'
import ListingMapComponent from "@/components/ListingMapComponent"

export default {
  components: {
    SearchForm,
    PickList,
    ListingMapComponent,
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
