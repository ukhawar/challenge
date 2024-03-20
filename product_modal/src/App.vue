<template>
  <!-- Demo Purposes -->
  <LogoSplash />
  <!-- Demo Purposes -->
  <SoliverLogo />
  <!-- Demo Purposes Design -->
  <ProductPage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { defineAsyncComponent } from "vue";
import LogoSplash from "@/components/branding/LogoSplash.vue";
import "./index.css";

@Options({
  components: {
    ProductPage: defineAsyncComponent(() => import("@/pages/ProductPage.vue")),
    SoliverLogo: defineAsyncComponent(
      () => import("@/components/branding/SoliverLogo.vue")
    ),
    LogoSplash,
  },
})
export default class App extends Vue {}
</script>
