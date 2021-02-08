<template>
  <button id="search-button">
    <slot></slot>
  </button>
</template>

<style>
#search-button {
  height: 2.2rem;
  border-radius: .5rem;
  margin-left: .4rem;
  padding: 0rem .8rem;
  border: solid gray 1px;
  background: white;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
