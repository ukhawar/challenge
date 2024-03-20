import { ref, computed, onMounted } from "vue";
import { Product } from "@/types/product";
import GetData from "@/services/getData";

const dataService = new GetData();

export function useProductData(productId: string) {
  const productData = ref<Product | null>(null);
  const selectedVariantIndex = ref<number>(0);
  const selectedImage = ref<string>("");
  const selectedProductId = ref<string>();

  /**
   * Fetches product data based on the provided product ID.
   * @param pid - Product ID to fetch data for.
   */
  const fetchData = async (pid: string): Promise<void> => {
    if (selectedProductId.value !== pid) {
      selectedProductId.value = pid;
      try {
        const response = await dataService.getProduct(pid);
        if (response) {
          productData.value = response;
          selectedImage.value =
            response.images.length > 0 ? response.images[0] : "";
        }
        selectedProductId.value = pid;
      } catch (error) {
        selectedProductId.value = pid;
        console.error("Error fetching data:", error);
      }
    }
  };

  /**
   * Updates the selected variant index.
   * @param index - Index of the selected variant.
   */
  const selectVariant = (index: number): void => {
    selectedVariantIndex.value = index;
    selectedImage.value = productData.value?.variants[index]?.image || "";
  };

  /**
   * Fetches product data based on the provided product ID.
   * @param pid - Product ID to fetch data for.
   */
  const selectColor = (id: string): void => {
    fetchData(id);
  };

  /**
   * Updates the selected size index.
   * @param index - Index of the selected size.
   */
  const selectSize = (selectedSize: string): void => {
    if (productData.value) {
      productData.value.size = selectedSize;
    }
  };

  /**
   * Updates the selected image.
   * @param image - Image URL to be displayed.
   */
  const selectImage = (image: string): void => {
    selectedImage.value = image;
  };

  /**
   * Determines the CSS class for a size button.
   * @param size - Size to determine the class for.
   * @returns Array of CSS class names.
   */
  const sizeClass = (size: string): string[] => {
    const classes = ["border", "rounded", "text-button-secondary"];
    if (productData.value?.size === size) {
      classes.push("border-border", "font-bold");
    } else if (!productData.value?.availableSizes?.includes(size)) {
      classes.push(
        "border-2",
        "border-border-secondary",
        "text-button-secondary-light",
        "cursor-default"
      );
    }

    return classes;
  };

  onMounted(() => fetchData(productId));

  return {
    productData,
    selectedVariantIndex,
    selectedImage,
    fetchData,
    selectVariant,
    selectColor,
    selectSize,
    selectImage,
    sizeClass,
    isMobile: computed(() => {
      return window.innerWidth < 768;
    }),
    selectedVariant: computed(
      () => productData.value?.variants[selectedVariantIndex.value]
    ),
    selectedVariantImage: computed(
      () =>
        selectedImage.value ||
        productData.value?.variants[selectedVariantIndex.value]?.image ||
        ""
    ),
    selectedSize: computed(() => productData?.value?.size),
  };
}
