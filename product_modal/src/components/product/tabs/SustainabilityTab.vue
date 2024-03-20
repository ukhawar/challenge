<template>
  <div class="sustainability-tab">
    <div
      v-for="detail in tabContent"
      :key="detail.label"
      class="sustainability-tab__detail"
    >
      <div v-if="detail.label" class="sustainability-tab__label">
        <div v-if="detail.icon" class="sustainability-tab__icon-container">
          <img
            :alt="`${detail.label} icon`"
            :src="getIconPath(detail?.icon)"
            class="sustainability-tab__icon"
            loading="lazy"
          />
        </div>
        <div class="sustainability-tab__text">
          {{ detail.label.toUpperCase() }}
        </div>
      </div>
      <div class="sustainability-tab__detail-content">
        {{ detail.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Sustainability } from "@/types/tab";
import { defineComponent, PropType } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "SustainabilityTab",
  props: {
    tabContent: {
      type: Object as PropType<Sustainability>,
      required: true,
    },
  },
  setup() {
    return { getIconPath };
  },
});
</script>

<style lang="scss" scoped>
.sustainability-tab {
  @apply font-sans text-text-secondary text-left;

  &__detail {
    @apply border-b p-2;
  }

  &__label {
    @apply flex font-bold;
  }

  &__icon-container {
    @apply p-1;
  }

  &__icon {
    @apply my-auto w-8 h-8 border-2 border-white invert rounded-full;
  }

  &__text {
    @apply my-auto pl-1;
  }

  &__detail-content {
    @apply flex-grow;
  }
}
</style>
