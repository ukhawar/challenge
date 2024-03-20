<template>
  <div v-if="showLogo" class="logo-container">
    <img
      alt="soliver logo"
      :src="getImagePath(`SOliver-Logo.svg`)"
      loading="lazy"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getImagePath } from "@/helpers/imagePathUtil";

export default defineComponent({
  name: "LogoSplash",
  setup() {
    const showLogo = ref(true);
    setTimeout(() => {
      showLogo.value = false;
    }, 3000);

    return { showLogo, getImagePath };
  },
});
</script>

<style scoped>
.logo-container {
  z-index: 100;
  background-color: white;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  animation: fadeOut 3s ease-in forwards;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    display: none;
  }
}

.logo-container img {
  height: 80px;
}
</style>
