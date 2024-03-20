import { Variant } from "@/types/product";
import { TabContent } from "@/types/tab";

export const Variants: Variant[] = [
  {
    colorLabel: "WHITE",
    colorHEX: "#ffffff",
    id: 1,
    image: "WHITE-2.webp",
  },
  {
    colorLabel: "BORDEAUX",
    colorHEX: "#a52a2a",
    id: 2,
    image: "BORDEAUX-2.webp",
  },
  {
    colorLabel: "NAVY",
    colorHEX: "#000080",
    id: 3,
    image: "NAVY-2.webp",
  },
  {
    colorLabel: "BLACK",
    colorHEX: "#000000",
    id: 4,
    image: "BLACK-2.webp",
  },
];

export const productDetails: TabContent[] = [
  {
    tab: "ProductDetailsTab",
    label: "Product Details",
    content: {
      texture: {
        label: "",
        content: "Texture: textured pattern",
        icon: "",
      },
      collar: {
        label: "",
        content: "Collar: Kent collar",
        icon: "",
      },
      sleeve: {
        label: "",
        content: "Sleeve: with turn-ups",
        icon: "",
      },
      pockets: {
        label: "",
        content: "Pockets: breast pocket",
        icon: "",
      },
      productCode: {
        label: "",
        content: "EAN: 406316254075 \nArticle Number: 13.005.22.2253.62A4.3XL",
        icon: "detail",
      },
      itemNumber: {
        label: "",
        content: "EAN: 406316254075 \nArticle Number: 13.005.22.2253.62A4.3XL",
        icon: "detail",
      },
    },
  },
  {
    label: "Fit",
    tab: "FitTab",
    content: {
      fitType: {
        label: "",
        content: "Fit: Regular Fit",
        icon: "",
      },
      backLength: {
        label: "",
        content: "Back length: bei Größe M ca. 75 cm",
        icon: "",
      },
    },
  },
  {
    label: "Material & Care Instructions",
    tab: "MaterialCareTab",
    content: {
      materialComposition: {
        label: "Material Composition",
        content: "",
        icon: "",
      },
      // this is just for demo purposes
      empty1: {
        label: "",
        content: "",
        icon: "",
      },
      fabric: {
        label: "",
        content: "Fabric: chambray",
        icon: "",
      },
      composition: {
        label: "",
        content: "99% Cotton, 1% Elastane",
        icon: "",
      },
      quality: {
        label: "",
        content: "Quality: lightweight",
        icon: "",
      },
      // this is just for demo purposes
      empty: {
        label: "",
        content: "",
        icon: "",
      },
      instruction: {
        label: "Care Instructions",
        content: "",
        icon: "",
      },
      // this is just for demo purposes
      empty2: {
        label: "",
        content: "",
        icon: "",
      },
      machineWash: {
        label: "",
        content: "Machine wash 30°",
        icon: "Gentle",
      },
      noDryCleaning: {
        label: "",
        content: "No dry cleaning",
        icon: "dry",
      },
      doNotChlore: {
        label: "",
        content: "Do not chlore",
        icon: "chlore",
      },
      handwarmIroning: {
        label: "",
        content: "Handwarm ironing",
        icon: "ironing",
      },
      tumbleDry: {
        label: "",
        content: "Tumble with reduced thermal pressure",
        icon: "tumbleWith",
      },
    },
  },
  {
    label: "Sustainability",
    tab: "SustainabilityTab",
    content: {
      care: {
        label: "",
        content:
          "WE CARE: Items with other sustainable properties that go beyond our minimum standards are marked with the WE CARE label.",
        icon: "",
      },
      certified: {
        label: "Certified Sustainable Fibre:",
        content:
          "When it comes to certified sustainable fibres, we're committed to using natural fibres from renewable sources. The raw materials are cultivated via resource-saving methods. This product supports economically, ecologically and socially sustainable cotton farming. The sourcing of sustainable cotton follows the principle of mass balance. You can find more information here.",
        icon: "SUSTAINABLE",
      },
    },
  },
];
