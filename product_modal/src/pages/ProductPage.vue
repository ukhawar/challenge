<template>
  <div class="product-page">
    <!-- Product Card -->
    <div
      v-for="product in productData?.variants"
      :key="product?.image"
      class="product-page__card"
    >
      <LazyImage
        :src="product?.image"
        :alt="product?.image"
        aspectRatio="142%"
        class="product-page__card-image"
        :containerClass="{ 'bg-white': true }"
        @click="openModal(String(product?.id))"
      />
      <div class="product-page__card-detail">
        <div class="product-page__logo">s.Oliver</div>
        <div class="product-page__name">
          {{ productData?.name }}
        </div>
        <div class="product-page__price">
          {{ productData?.price }} {{ productData?.currency?.symbol }}
        </div>
        <div class="product-page__color-images">
          <!-- Color Images -->
          <div
            v-for="variant in productData?.variants"
            :key="variant?.colorLabel"
            :style="{ backgroundColor: variant?.colorHEX }"
            class="product-page__color-box"
            @click="openModal(String(product?.id))"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <!-- ... other parts of your template ... -->
  <SharedModal :isModalOpen="isModalOpen" :closeModal="closeModal">
    <ProductView
      :key="`productView_${selectedProduct}`"
      :productId="selectedProduct"
      @close="closeModal"
    />
  </SharedModal>
  <notifications position="bottom center" />
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onUnmounted,
  watchEffect,
} from "vue";
import { useProductData } from "@/composables/useProductData";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProductPage",
  components: {
    ProductView: defineAsyncComponent(
      () => import("@/pages/product/ProductView.vue")
    ),
    SharedModal: defineAsyncComponent(
      () => import("@/components/shared/SharedModal.vue")
    ),
    LazyImage: defineAsyncComponent(
      () => import("@/components/shared/LazyImage.vue")
    ),
  },
  setup() {
    const store = useStore();
    const isModalOpen = computed(() => store?.state?.product.isModalOpen);
    const selectedProduct = computed(
      () => store?.state?.product.selectedProduct
    );
    const {
      productData,
      selectedVariantImage,
      selectSize,
      sizeClass,
      selectImage,
    } = useProductData(selectedProduct.value);
    const openModal = (productId: string) => {
      store.dispatch("product/openModal", productId);
    };
    const closeModal = () => {
      store.dispatch("product/closeModal");
    };
    watchEffect(() => {
      document.body.classList.toggle("no-scroll", isModalOpen.value);
    });
    onUnmounted(() => {
      document.body.classList.remove("no-scroll");
    });

    return {
      isModalOpen,
      closeModal,
      openModal,
      productData,
      selectedVariantImage,
      selectSize,
      sizeClass,
      selectImage,
      selectedProduct,
    };
  },
});
</script>

<style>
.no-scroll {
  overflow: hidden;
}
/* Fade transition styles */
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 1;
}
</style>

<style lang="scss" scoped>
.product-page {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20 py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;

  &__card {
    @apply p-4 flex flex-col items-center rounded-lg hover:shadow-md transition-shadow duration-300;

    &-detail {
      @apply text-left w-full;
    }

    &-image {
      @apply cursor-pointer mb-4;
    }
  }

  &__color-images {
    @apply flex items-center mt-2;
  }

  &__color-box {
    @apply cursor-pointer w-4 h-4 mx-2 rounded-full inline-block ring-1 ring-gray-200 ring-offset-4;
  }

  &__logo {
    @apply text-text-secondary-light font-medium;
  }

  &__name {
    @apply text-text;
  }

  &__price {
    @apply font-bold text-text;
  }
}
</style>
