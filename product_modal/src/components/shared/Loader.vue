<template>
  <div class="loader" v-if="!loaded"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoaderComponent",
  props: {
    loaded: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg); /* Rotate from 0 degrees */
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg); /* Rotate to 360 degrees */
  }
}

.loader {
  @apply absolute top-1/2 left-1/2 z-10 rounded-full w-10 h-10;

  transform: translate(-50%, -50%) rotate(0deg);
  border: 4px solid rgba(255, 255, 255, 0.179);
  border-top: 4px solid #7f7f7f9f;
  animation: spin 2s linear infinite;
}
</style>
