import { test } from '@playwright/test';
import { PDPPage } from '../page-objects/pdp.page';
import { PLPPage } from '../page-objects/plp.page';

test.describe('Product Detail Page Tests', () => {
    let plpPage: PLPPage;
    let pdpPage: PDPPage;
  
    test.beforeEach(async ({ page }) => {
      plpPage = new PLPPage(page);
      pdpPage = new PDPPage(page);
      await plpPage.navigate('http://localhost:8080'); 
      const imageSelector = "//img[@alt='BORDEAUX-2.webp']"; 
      await page.waitForSelector(imageSelector);
      await page.click(imageSelector);
      const productViewContainerSelector = "//div[@id='app']//section[@class='shared-modal__content']//div[@class='close-button-container']"; 
      await page.waitForSelector(productViewContainerSelector, { state: 'visible' });
      const isVisible = await page.isVisible(productViewContainerSelector);
      await page.waitForTimeout(10000);
    });

  test('Article Price is Available on Product Display Page', async ({ page }) => {

  await pdpPage.verifyArticlePrice();
});

  test('Verify Colors on Product Display Page', async ({ page }) => {
  
    await pdpPage.verifyColorOptions();
  });

  test('Verift Article Name Available on Product Display Page', async ({ page }) => {

    await pdpPage.verifyArticleName();
  });

  test('Verify that selecting a size is applied successfully on Product Display Page', async ({ page }) => {
     const pdpPage = new PDPPage(page);
    // Verify size selection functionality
    await pdpPage.verifySizeSelection();
  }); 

  test('Verify tabs Available on Product Display Page', async ({ page }) => {

    const pdpPage = new PDPPage(page);
    // Ensure the main content is visible before interacting with tabs
    await page.waitForSelector('.product-details-tab__content', { state: 'visible' });
    // Verify all tabs
    await pdpPage.verifyAllTabs();
});

  test('Verify that changing color updates the product image on Product Display Page', async ({ page }) => {

        const initialImageSrc = await pdpPage.getInitialProductImageSrc();
        // Select the first color option
        await pdpPage.selectColorOption(0);
        // Wait for the image to update
        await page.waitForTimeout(500); 
        // Get the updated product image src
        const updatedImageSrc = await pdpPage.getUpdatedProductImageSrc()
        // Assert that the image src has changed (indicating the image was updated)
        expect(updatedImageSrc).not.toBe(initialImageSrc);
    });
  test('Verify notification appears and vanishes after adding to cart', async ({ page }) => {
   
    await pdpPage.addToCart();
    // Verify the notification appears and has the correct text
    await pdpPage.waitForNotification();
    /// Wait and verify the notification disappears
    await pdpPage.waitForNotificationToDisappear();
  });

  test('Verify Add to Cart button is disabled when size is not selected', async ({ page }) => {

    await pdpPage.verifyAddToCartButtonDisabledWhenSizeNotSelected();
  }); 

  test('Check available sizes and their visibility', async ({ page }) => {
   
    const expectedSizes = ['S', 'M', 'L', 'XL'];
    await pdpPage.checkSizeOptions(expectedSizes);
  });

  test('Verify PDP window close when click on close button', async ({ page }) => {

    await pdpPage.closePDP();
  });  
});