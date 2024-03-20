<template>
  <div class="product-details-tab">
    <div class="product-details-tab__content">
      <div v-if="tabContent?.texture">
        {{ tabContent.texture.content }}
      </div>
      <div v-if="tabContent?.collar">
        {{ tabContent.collar.content }}
      </div>
      <div v-if="tabContent?.sleeve">
        {{ tabContent.sleeve.content }}
      </div>
      <div v-if="tabContent?.pockets">
        {{ tabContent.pockets.content }}
      </div>
      <div
        v-if="tabContent?.itemNumber"
        class="product-details-tab__item-number"
      >
        <div
          v-if="tabContent.itemNumber.icon"
          class="product-details-tab__icon-container"
        >
          <img
            :alt="tabContent.itemNumber.icon"
            :src="getIconPath(tabContent.itemNumber.icon)"
            class="product-details-tab__icon"
            loading="lazy"
          />
        </div>
        {{ tabContent.itemNumber.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductDetailInfo } from "@/types/tab";
import { defineComponent, PropType } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "ProductDetailsTab",
  props: {
    tabContent: {
      type: Object as PropType<ProductDetailInfo>,
      default: () => ({}),
    },
  },
  setup() {
    return { getIconPath };
  },
});
</script>

<style lang="scss" scoped>
.product-details-tab {
  @apply font-sans text-text-secondary p-2 text-left;

  &__title {
    @apply font-bold mb-2;
  }

  &__content {
    @apply mb-4;
  }

  &__item-number {
    @apply flex items-center mt-3 whitespace-pre-line;
  }

  &__icon-container {
    @apply bg-white mr-3 p-2 rounded-full;
  }

  &__icon {
    @apply w-5 h-5;
  }
}
</style>
