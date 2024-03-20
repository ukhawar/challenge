<template>
  <transition name="modal">
    <div
      v-if="isModalOpen"
      @click="closeModal"
      class="shared-modal"
      data-test="modal-backdrop-test"
    >
      <section
        class="shared-modal__content"
        @click.stop
        data-test="modal-content-test"
      >
        <slot data-test="modal-slot-test"></slot>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SharedModal",
  props: {
    isModalOpen: Boolean,
    closeModal: Function as PropType<() => void>,
  },
});
</script>

<style lang="scss" scoped>
.shared-modal {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10;

  &__content {
    @apply bg-transparent rounded-lg overflow-auto p-4;
  }
}

.modal {
  &-enter-active {
    @apply transition-opacity duration-1000;
  }
  &-enter-from {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
