<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    :width="size"
    :height="size"
    :fill="color"
    class="location-pin-filled-icon"
  >
    <path d="M533.064 907.952l-21.064 30.494-21.064-30.494c-176.532-255.568-264.803-432.11-264.803-535.083 0-157.88
    127.987-285.867 285.867-285.867s285.867 127.987 285.867 285.867c0 102.973-88.271 279.515-264.803 535.083zM512
    469.467c48.636 0 88.064-39.428 88.064-88.064s-39.428-88.064-88.064-88.064c-48.636 0-88.064 39.428-88.064
    88.064s39.428 88.064 88.064 88.064z"></path>
  </svg>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: '#999',
      },

      size: {
        type: Number,
        default: 20,
      },
    },
  }
</script>
