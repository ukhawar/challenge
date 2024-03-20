import { Module } from "vuex";

interface ProductPageState {
  isModalOpen: boolean;
  selectedProduct: string | null;
}

const state: ProductPageState = {
  isModalOpen: false,
  selectedProduct: "1",
};

const productModule: Module<ProductPageState, unknown> = {
  namespaced: true,
  state,
  mutations: {
    setModalState(state, isOpen: boolean) {
      state.isModalOpen = isOpen;
    },
    setSelectedProduct(state, productId: string | null) {
      state.selectedProduct = productId;
    },
  },
  actions: {
    openModal({ commit }, productId: string) {
      commit("setModalState", true);
      commit("setSelectedProduct", productId);
    },
    closeModal({ commit }) {
      commit("setModalState", false);
      commit("setSelectedProduct", null);
    },
  },
};

export default productModule;
