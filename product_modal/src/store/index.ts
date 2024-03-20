import { createStore } from "vuex";
import productPage from "./modules/productPage";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { product: productPage },
});
