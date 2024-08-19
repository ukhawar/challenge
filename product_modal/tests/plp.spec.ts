import { test, expect } from '@playwright/test';
import { PLPPage } from '../page-objects/plp.page';
import { PDPPage } from '../page-objects/pdp.page';

const viewports = [
    { name: 'Mobile', width: 375, height: 667 }, // iPhone 6/7/8
    { name: 'Tablet', width: 768, height: 1024 }, // iPad
    { name: 'Desktop', width: 1440, height: 900 } // Desktop
  ];

  test.describe('Product Listing Page Tests', () => {
  let plpPage: PLPPage;
  let pdpPage: PDPPage;

  test.beforeEach(async ({ page }) => {
    plpPage = new PLPPage(page);
    pdpPage = new PDPPage(page);
    await plpPage.navigate('http://localhost:8080'); // Replace with your PLP URL
  });

  test('PLP page title should be correct', async () => {
    const expectedTitle = 'product_modal';
    await plpPage.verifyPageTitle(expectedTitle);
  });

  test.describe('PLP Responsive Design Tests', () => {
    viewports.forEach(({ name, width, height }) => {
      test(`PLP should display correctly on ${name}`, async ({ page }) => {
        const plpPage = new PLPPage(page);
        await plpPage.setViewportSize(width, height);
        await plpPage.checkImagesAndTakeScreenshot(`screenshots/plp-${name}.png`);
      });
    });
  });

  test('All products should have titles', async () => {
    await plpPage.verifyAllProductsHaveTitles();
  });

  test('Verify all product images are available and visible', async () => {
    await plpPage.verifyAllProductImagesAvailable();
  });

  test('Verify all product prices are available and valid', async () => {
    await plpPage.verifyAllProductPricesAvailable();
  });

  test('Verify that colors on PLP should be available for each product', async () => {
    await plpPage.verifyAllProductColorsAvailable();
  });
  
  test('Verify same product opens in PDP when clicking product from PLP', async () => {
    await plpPage.clickProductImage();
    // Capture product details from PLP
    const { imageSrc: imageSrcPLP, productTitle: productTitlePLP, productPrice: productPricePLP } = await plpPage.getProductDetails();
    // Verify PDP is visible
    await pdpPage.verifyPDPVisible();
    // Capture product details from PDP
    const { productTitle: productTitlePDP, productPrice: productPricePDP, imageSrc: imageSrcPDP } = await pdpPage.getProductDetails();
    // Verify that product details match between PLP and PDP
    expect(productTitlePDP).toBe(productTitlePLP);
    expect(productPricePDP).toBe(productPricePLP);
    expect(imageSrcPDP).toBe(imageSrcPLP);
  });

});
