export interface Detail {
  label: string;
  content: string;
  icon: string;
}

export interface MaterialAndCare {
  materialComposition: Detail;
  instruction: Detail;
  fabric: Detail;
  quality: Detail;
  composition: Detail;
  machineWash: Detail;
  noDryCleaning: Detail;
  doNotChlore: Detail;
  handwarmIroning: Detail;
  tumbleDry: Detail;
  // jsut for demo purposes
  empty: Detail;
  empty1: Detail;
  empty2: Detail;
}

export interface FitDetails {
  fitType: Detail;
  backLength: Detail;
}

export interface Sustainability {
  care: Detail;
  certified: Detail;
}

export interface ProductDetailInfo {
  texture: Detail;
  collar: Detail;
  sleeve: Detail;
  pockets: Detail;
  itemNumber: Detail;
  productCode: Detail;
}

export interface TabContent {
  label: string;
  tab: string;
  content: MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability;
}
