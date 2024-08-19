import { test } from '@playwright/test';
import { PDPPage } from '../page-objects/pdp.page';
import { PLPPage } from '../page-objects/plp.page';

test.describe('Product Detail Page Tests', () => {
    let plpPage: PLPPage;
    let pdpPage: PDPPage;
  
    test.beforeEach(async ({ page }) => {
      plpPage = new PLPPage(page);
      pdpPage = new PDPPage(page);
      await plpPage.navigate('http://localhost:8080'); // Replace with your PLP URL
      const imageSelector = "//img[@alt='BORDEAUX-2.webp']"; 
      // Wait for the image to be visible and click on it
      await page.waitForSelector(imageSelector);
      await page.click(imageSelector);
      const productViewContainerSelector = "//div[@id='app']//section[@class='shared-modal__content']//div[@class='close-button-container']"; 
      await page.waitForSelector(productViewContainerSelector, { state: 'visible' });
      const isVisible = await page.isVisible(productViewContainerSelector);
    
      await page.waitForTimeout(10000);
     // expect(isVisible).toBe(true);
    });

test('Article Price Available on PDP', async ({ page }) => {
  //const pdpPage = new PDPPage(page);
  // Verify the article price on PDP
  await pdpPage.verifyArticlePrice();
});
test('Verify Colors on PDP page', async ({ page }) => {
  //  const pdpPage = new PDPPage(page);
    // Verify the color options on PDP
    await pdpPage.verifyColorOptions();
  });
test('Article Name Available on PDP', async ({ page }) => {
    //const pdpPage = new PDPPage(page);
    // Verify the article name on PDP
    await pdpPage.verifyArticleName();
  });
  test('Verify that selecting a size is applied successfully', async ({ page }) => {
     const pdpPage = new PDPPage(page);
    // Verify size selection functionality
    await pdpPage.verifySizeSelection();
  }); 
  test('Verify tabs on PDP page', async ({ page }) => {
    const pdpPage = new PDPPage(page);
    // Ensure the main content is visible before interacting with tabs
    await page.waitForSelector('.product-details-tab__content', { state: 'visible' });
    // Verify all tabs
    await pdpPage.verifyAllTabs();
});
test('Verify that changing color updates the product image', async ({ page }) => {
   // const productPage = new ProductPage(page);
    // Get the initial product image src
    const initialImageSrc = await pdpPage.getInitialProductImageSrc();
    // Select the first color option
    await pdpPage.selectColorOption(0);
    // Wait for the image to update
    await page.waitForTimeout(500); // Adjust as needed
    // Get the updated product image src
    const updatedImageSrc = await pdpPage.getUpdatedProductImageSrc()
    // Assert that the image src has changed (indicating the image was updated)
    expect(updatedImageSrc).not.toBe(initialImageSrc);
  });
  test('Verify notification appears and vanishes after adding to cart', async ({ page }) => {
    //const productPage = new ProductPage(page);
    // Add to cart
    await pdpPage.addToCart();
    // Verify the notification appears and has the correct text
    await pdpPage.waitForNotification();
    // Wait and verify the notification disappears
    await pdpPage.waitForNotificationToDisappear();
  });
  test('Verify Add to Cart button is disabled when size is not selected', async ({ page }) => {
  // const productPage = new ProductPage(page);
  
    // Navigate to the product page if necessary
    // await page.goto('your-product-page-url');
  
    await pdpPage.verifyAddToCartButtonDisabledWhenSizeNotSelected();
  }); 
  test('Check available sizes and their visibility', async ({ page }) => {
    //const productPage = new ProductPage(page);
  
    // Define the list of expected sizes
    const expectedSizes = ['S', 'M', 'L', 'XL'];
  
    // Verify size options
    await pdpPage.checkSizeOptions(expectedSizes);
  });

test('Verify PDP window close when click on close button', async ({ page }) => {
   // const productDetailPage = new ProductDetailPage(page);
    // Perform the action to close the PDP
    await pdpPage.closePDP();
});  
});