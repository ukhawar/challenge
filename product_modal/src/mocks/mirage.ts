import { Product } from "@/types/product";
import { createServer, Model, Factory, Server, Response } from "miragejs";
import { Variants, productDetails } from "./data";

// const products = [
//   {
//     name: "T-shirt with an embroidered logo",
//     images:
//   }
// ]

// Function to initialize MirageJS server, typically used in a development environment
export function makeServer({ environment = "development" } = {}): Server {
  return createServer({
    environment,

    // Model definition for 'Product' mirroring the structure of the interface
    models: {
      product: Model.extend<Partial<Product>>({}),
    },

    // Factory for generating mock data for 'Product'
    factories: {
      product: Factory.extend<Partial<Product>>({
        id(i) {
          // Auto-incremented ID for each generated product
          return i + 1;
        },
        name: "T-shirt with an embroidered logo",
        description: "Model is 184 cm tall and wears size L.",
        currency: { symbol: "€", label: "EUR" },
        price() {
          // Randomly generated price
          return Math.floor(Math.random() * (30 - 5 + 1)) + 1.99;
        },
        originalPrice() {
          // Original price, slightly higher than the selling price
          return 30 + Math.floor(Math.random() * (30 - 5 + 1)) + 5.99;
        },
        color(i) {
          return Variants.find((value) => value.id === i + 1)?.colorLabel;
        }, // Default color for the product
        images(i) {
          const image = Variants.find(
            (value) => value.id === i + 1
          )?.colorLabel;
          // Unique set of images for each product
          return [`${image}-1.webp`, `${image}-2.webp`];
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        availableSizes() {
          // Random subset of sizes, maintaining the order
          const allSizes = ["S", "M", "L", "XL", "XXL"];
          return allSizes.filter(() => Math.random() > 0.5);
        },
        variants: Variants,
        size: "", // Default size for the product
        tabs: productDetails,
      }),
    },

    // Seeder to generate a predefined number of products
    seeds(server) {
      server.createList("product", 10); // Creates 10 products using the defined factory
    },

    // API endpoints
    routes() {
      this.namespace = "api";

      // Endpoint to fetch a specific product by ID
      this.get("/products/:productId", (schema, request) => {
        const productId = request.params.productId;

        // Finding the product by ID in the Mirage database
        const product = schema.find("product", productId);

        // Respond with 404 error if the product is not found
        if (!product) {
          return new Response(404, {}, { error: "Product not found" });
        }

        // Return the found product in a structured response
        return {
          data: {
            type: "product",
            id: product.id,
            attributes: product.attrs,
          },
        };
      });
    },
  });
}
