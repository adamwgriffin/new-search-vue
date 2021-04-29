<template>
  <div class="dot-indicator"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
.dot-indicator {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: gray;
  color: gray;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: .5s;
}

.dot-indicator::before, .dot-indicator::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-indicator::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: gray;
  color: gray;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-indicator::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: gray;
  color: gray;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: gray;
  }
  50%,
  100% {
    background-color: lightgray;
  }
}
</style>
