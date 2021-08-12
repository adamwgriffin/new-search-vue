<template>
  <button id="boundary-control" @click="$emit('click')">
    Remove Boundary
  </button>
</template>

<style scoped>
#boundary-control {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  z-index: 1;
  cursor: pointer;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  height: 40px;
  border-radius: 6px;
  padding: 0 .8rem;
  margin: 0 0 5px 8px;
  background: #fefefe;
  font-size: 14px;
  font-family: inherit;
  color: inherit;
}

#boundary-control:hover {
  background: #f6f6f6;
}
</style>
