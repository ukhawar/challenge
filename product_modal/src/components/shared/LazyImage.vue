<template>
  <div
    class="lazy-image"
    :class="containerClass"
    :style="{ paddingBottom: aspectRatio }"
  >
    <img
      v-if="loaded"
      :src="imageUrl"
      :alt="altText"
      :style="{
        height: `${height}`,
        width: `${width}`,
        'object-fit': 'contain',
      }"
      class="lazy-image__img lazy-image__img--transition"
      loading="lazy"
    />
    <div v-else class="lazy-image__loader">
      <LoaderComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, ref } from "vue";
import { getImagePath } from "@/helpers/imagePathUtil";

export default defineComponent({
  name: "LazyImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "auto",
    },
    height: {
      type: String,
      default: "auto",
    },
    alt: {
      type: String,
      default: "",
    },
    aspectRatio: {
      type: String,
      default: "100%", // Default to 16:9 aspect ratio
    },
    containerClass: {
      type: [Object, String, Array],
      default: () => ({}),
    },
  },
  components: {
    LoaderComponent: defineAsyncComponent(
      () => import("@/components/shared/Loader.vue")
    ),
  },
  setup(props) {
    const loaded = ref(false);
    const imageUrl = ref("");
    const srcPath = getImagePath(props.src);

    onMounted(() => {
      const image = new Image();
      image.src = srcPath;
      image.onload = () => {
        loaded.value = true;
        imageUrl.value = srcPath;
      };
    });

    return {
      loaded,
      imageUrl,
      altText: props.alt,
    };
  },
});
</script>

<style lang="scss" scoped>
.lazy-image {
  @apply h-0 relative block w-full overflow-hidden;

  &__img {
    @apply absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out;

    &--transition {
      @apply opacity-100;
    }
  }

  &__loader {
    @apply absolute top-0 left-0 w-full h-full bg-white;
  }
}
</style>
