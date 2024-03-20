<template>
  <footer class="product-sticky-footer">
    <div class="product-sticky-footer__name">
      {{ productName }}
    </div>
    <div class="product-sticky-footer__form">
      <form
        class="h-full flex items-center"
        @submit="(event) => addToCart(event, productName)"
      >
        <label for="amount">Amount:</label>
        <input
          type="text"
          class="border-2 border-black rounded-md m-2 w-12 px-1"
          name="amount"
          id="amount"
          value="1"
          pattern="[1-9][0-9]*[A-Za-z]*"
          required
        />
        <button type="submit" class="product-sticky-footer__add-cart-button">
          <div class="product-sticky-footer__add-cart-text">
            <div class="product-sticky-footer__add-cart-text-content">
              Add to Cart
            </div>
            <div class="product-sticky-footer__icon-container">
              <img
                alt="shopping-cart"
                :src="getIconPath('shopping-cart')"
                class="product-sticky-footer__cart-icon"
                loading="lazy"
              />
            </div>
          </div>
        </button>
      </form>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "StickyFooter",
  props: {
    productName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const addToCart = (event: Event, productName: string) => {
      event.preventDefault();
      emit("add-to-cart", productName);
    };

    return { addToCart, getIconPath };
  },
});
</script>

<style lang="scss" scoped>
.product-sticky-footer {
  @apply bg-white flex justify-center md:justify-between flex-wrap w-full p-2 shadow-inner;

  &__name {
    @apply leading-[44px] text-text px-5 py-1 overflow-hidden whitespace-nowrap text-ellipsis;
  }

  &__add-cart-button {
    @apply text-xs w-auto my-auto px-2 py-2 min-w-40 bg-black text-white hover:bg-gray-800;
  }

  &__add-cart-text {
    @apply flex justify-between whitespace-nowrap;

    &-content {
      @apply font-bold text-text-secondary text-white;
    }
  }

  &__icon-container {
    @apply my-auto;

    .product-sticky-footer__cart-icon {
      @apply w-4 h-4 invert;
    }
  }
}
</style>
