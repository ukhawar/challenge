<template>
  <section class="product-info" v-if="tabs">
    <ul class="product-info__tab-list">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'product-info__tab-item',
          {
            'product-info__tab-item--active': activeTabContent
              ? activeTab === tab?.tab
              : tabs[0]?.tab === tab?.tab,
          },
        ]"
        @click="setActiveTab(tab)"
      >
        {{ tab?.label.toUpperCase() }}
      </li>
    </ul>
    <div class="product-info__tab-content">
      <transition name="fade">
        <component
          :is="activeTab"
          v-if="activeTabContent"
          :tabContent="activeTabContent"
        />
      </transition>
      <transition name="fade">
        <component
          :is="tabs[0]?.tab"
          v-if="!activeTabContent"
          :tabContent="tabs[0]?.content"
        />
      </transition>
    </div>
  </section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType, ref } from "vue";
import ProductDetailsTab from "@/components/product/tabs/ProductDetailsTab.vue";
import {
  FitDetails,
  MaterialAndCare,
  ProductDetailInfo,
  Sustainability,
  TabContent,
} from "@/types/tab";

export default defineComponent({
  name: "TabsComponent",
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
    const activeTab = ref<string>("");
    const activeTabContent = ref<
      MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability
    >();

    const setActiveTab = (tab: TabContent) => {
      activeTab.value = tab.tab;
      activeTabContent.value = tab.content;
    };
    return {
      activeTab,
      activeTabContent,
      setActiveTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-info {
  @apply px-2 bg-bg-secondary min-h-[50%];

  &__tab-list {
    @apply flex py-3;
    list-style-type: none;
  }

  &__tab-item {
    @apply cursor-pointer text-text-secondary font-bold p-2;
    border-bottom: 3px solid transparent;
    transition: border-color 0.3s ease;

    &--active {
      border-bottom: 3px solid #343434;
    }
  }

  &__tab-content {
    @apply min-h-min;
  }
}
</style>
