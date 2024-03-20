<template>
  <div class="fit-tab">
    <div v-if="tabContent?.fitType" class="fit-tab__content">
      {{ tabContent.fitType.content }}
    </div>
    <div v-if="tabContent?.backLength" class="fit-tab__content">
      {{ tabContent.backLength.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { FitDetails } from "@/types/tab";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "FitTab",
  props: {
    tabContent: {
      type: Object as PropType<FitDetails>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.fit-tab {
  @apply font-sans p-2 text-text-secondary text-left;

  &__title {
    @apply font-bold mb-2;
  }

  // If you have styles to add to &__content, you can add them here.
  &__content {
  }
}
</style>
