<template>
  <section class="product-info">
    <div
      class="product-info__accordion-item"
      v-for="(tab, index) in tabs"
      :key="index"
    >
      <button
        type="button"
        class="product-info__accordion-button"
        @click="setActiveAcc(tab)"
      >
        {{ tab.label.toUpperCase() }}
        <img
          :alt="'arrow'"
          :src="getIconPath('arrow')"
          class="product-info__icon"
          :class="{ 'product-info__icon--rotated': activeTab === tab?.tab }"
          loading="lazy"
        />
      </button>
      <Transition name="fade">
        <component
          :key="activeTab"
          :is="activeTab"
          v-if="activeTab === tab?.tab && activeTabContent"
          :tabContent="activeTabContent"
          class="product-info__accordion-content"
        />
      </Transition>
    </div>
  </section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType, ref } from "vue";
import {
  FitDetails,
  MaterialAndCare,
  ProductDetailInfo,
  Sustainability,
  TabContent,
} from "@/types/tab";
import ProductDetailsTab from "@/components/product/tabs/ProductDetailsTab.vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "AccordionComponent",
  props: {
    tabs: {
      type: Array as PropType<TabContent[]>,
      required: true,
    },
  },
  components: {
    ProductDetailsTab,
    SustainabilityTab: defineAsyncComponent(
      () => import("@/components/product/tabs/SustainabilityTab.vue")
    ),
    MaterialCareTab: defineAsyncComponent(
      () => import("@/components/product/tabs/MaterialCareTab.vue")
    ),
    FitTab: defineAsyncComponent(
      () => import("@/components/product/tabs/FitTab.vue")
    ),
  },

  setup() {
    const activeTab = ref("");
    const activeTabContent = ref<
      MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability
    >();

    const setActiveAcc = (tab: TabContent) => {
      if (activeTab.value === tab.tab) {
        activeTab.value = "";
      } else {
        activeTab.value = tab.tab;
        activeTabContent.value = tab.content;
      }
    };

    return {
      getIconPath,
      activeTab,
      activeTabContent,
      setActiveAcc,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-info {
  @apply text-left px-2;

  &__accordion-button {
    @apply w-full flex justify-between text-text-secondary font-bold cursor-pointer p-3 text-left bg-white outline-none transition-colors duration-300 ease-in-out;

    &.active {
      @apply bg-bg-secondary;
    }
  }

  &__icon {
    @apply mr-2 w-4 h-4 transition-all;
    transition: transform 0.3s ease;

    &--rotated {
      transform: rotate(180deg);
      filter: blur(0.5px);
    }
  }

  &__accordion-item {
    @apply w-full border-0 border-b border-solid border-gray-300;
  }
}
</style>
