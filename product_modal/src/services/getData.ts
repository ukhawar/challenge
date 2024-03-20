import { Product } from "@/types/product";
import productService from "./productService";

export default class GetData {
  /**
   * Fetches product data for the given ID.
   * @param id - The ID of the product to fetch.
   * @returns A Promise resolving to the fetched Product.
   */
  // @log
  public async getProduct(id: string): Promise<Product> {
    try {
      return await productService.fetchProductData(id);
    } catch (error) {
      console.error("Error in getProduct:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}
