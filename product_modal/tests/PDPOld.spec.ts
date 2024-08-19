import { test, expect } from '@playwright/test';

     test.describe('PDP Tests', () => {

    // Define the base URL for the PLP
    const baseUrl = 'http://localhost:8080'; 
  
    // Hook to run before each test
    test.beforeEach(async ({ page }) => {
      await page.goto(baseUrl);
      const imageSelector = "//img[@alt='BORDEAUX-2.webp']"; 
      // Wait for the image to be visible and click on it
      await page.waitForSelector(imageSelector);
      await page.click(imageSelector);
      const productViewContainerSelector = "//div[@id='app']//section[@class='shared-modal__content']//div[@class='close-button-container']"; 
      await page.waitForSelector(productViewContainerSelector, { state: 'visible' });
      const isVisible = await page.isVisible(productViewContainerSelector);
      expect(isVisible).toBe(true);
      await page.waitForTimeout(10000);
    });
 
  test('Check available sizes and their visibility', async ({ page }) => {
        await page.waitForSelector('.product-detail__size-options > button', { state: 'visible' });
        const sizeButtonSelector = '.product-detail__size-options > button';
       // Define the list of expected sizes
        const expectedSizes = ['S', 'M', 'L', 'XL']; 
        // Wait for the size options container to be visible
        await page.waitForSelector(sizeButtonSelector, { state: 'visible' });
        // Locate all size buttons
        const sizeButtons = await page.$$(sizeButtonSelector);
        // Extract the text content and check interactability of all size buttons
        const sizeStatus = await Promise.all(
        sizeButtons.map(async (button) => {
        const text = await button.textContent();
        const isVisible = await button.isVisible();
        const isEnabled = await button.isEnabled();
        return { size: text?.trim() || '', isVisible, isEnabled };
      })
    );
        // Log sizes and their statuses
        console.log('Size Statuses:');
        sizeStatus.forEach(({ size, isVisible, isEnabled }) => {
        console.log(`Size: ${size}, Visible: ${isVisible}, Enabled: ${isEnabled}`);
      });
        // Create sets for available and not available sizes
        const availableSizes = sizeStatus
        .filter(({ isVisible, isEnabled }) => isVisible && isEnabled)
        .map(({ size }) => size);
        const unavailableSizes = sizeStatus
        .filter(({ isVisible, isEnabled }) => !isVisible || !isEnabled)
        .map(({ size }) => size);
        // Log available and unavailable sizes
        console.log('Available and interactable sizes:', availableSizes);
        console.log('Not available or not interactable sizes:', unavailableSizes);
        // Check that at least one size is available and interactable
        expect(availableSizes.length).toBeGreaterThan(0);
        // Check that the expected sizes are either available or not
        expectedSizes.forEach(size => {
        if (!availableSizes.includes(size) && !unavailableSizes.includes(size)) {
        console.error(`Expected size "${size}" is neither available nor interactable.`);
  }
});
    });

  test('Verify Colors on PDP page', async ({ page }) => {
    await page.waitForSelector('.product-detail__color-value', { state: 'visible' });
    const colorOptionSelector = '.product-detail__color-value'; 
    //Wait for the color options to be visible
    await page.waitForSelector(colorOptionSelector, { state: 'visible' });
    //Locate all color options
    const colorOptions = await page.$$(colorOptionSelector);
    expect(colorOptions.length).toBeGreaterThan(0);
    // Check that each color option is visible and interactable
      for (const colorOption of colorOptions) {
        const isVisible = await colorOption.isVisible();
        const isEnabled = await colorOption.isEnabled();
        const colorText = await colorOption.textContent();
        expect(isVisible).toBe(true);
        //expect(isEnabled).toBe(true);
        expect(colorText?.trim()).not.toBe('');
        console.log(`Color: ${colorText?.trim()}, Visible: ${isVisible}, Enabled: ${isEnabled}`);
  }
});
  test('Article Name Available on PDP', async ({ page }) => {
    await page.waitForTimeout(10000);
    await page.waitForSelector('.product-detail__name', { state: 'visible' });
    const articleNameSelector = '.product-detail__name'; 
    const articleName = await page.textContent(articleNameSelector);
    console.log(`Article name: ${articleName}`);
    expect(articleName).not.toBeNull();
    console.log('Article name check completed successfully.');
});
test('Article Price Available on PDP', async ({ page }) => {
  //await page.waitForTimeout(10000);
  await page.waitForSelector('.product-detail__price', { state: 'visible' });
  const articlePriceSelector = '.product-detail__price'; 
  const articlePrice = await page.textContent(articlePriceSelector);
  console.log(`Article Price: ${articlePrice}`);
  expect(articlePrice).not.toBeNull();
  console.log('Article Price check completed successfully.');
});
test('Verify that selecting a size is applied successfully', async ({ page }) => {
    //  await page.waitForTimeout(10000);
      await page.waitForSelector('div.product-detail__size-options > button', { state: 'visible' });
      const sizeOptionSelector = 'div.product-detail__size-options > button';
      const selectedSizeDisplaySelector = '.product-detail__size-value'; 
      // Locate all size options
      const sizeOptions = page.locator(sizeOptionSelector);
      // Ensure there is at least one size option available
      const count = await sizeOptions.count();
      expect(count).toBeGreaterThan(0);
      let sizeOptionToClick: any = null;
        for (let i = 0; i < count; i++) {
          const sizeOption = sizeOptions.nth(i);
          // Ensure the size option is visible and enabled
          const isVisible = await sizeOption.isVisible();
          const isEnabled = await sizeOption.isEnabled();
          if (isVisible && isEnabled) {
            sizeOptionToClick = sizeOption;
            break;
          }
        }
      // Ensure a clickable size option was found
      if (!sizeOptionToClick) {
        throw new Error('No clickable size option found.');
      }
      // Store the text of the selected size option
      const selectedSizeText = await sizeOptionToClick.textContent();
      if (selectedSizeText === null) {
        throw new Error('Failed to retrieve text content from the size option.');
      }
      // Click the size option
      await sizeOptionToClick.click();
      await page.waitForTimeout(500); 
      // Verify that the selected size is displayed correctly
      const selectedSizeDisplay = page.locator(selectedSizeDisplaySelector);
      await expect(selectedSizeDisplay).toHaveText(selectedSizeText);
    });

test('Verify tabs on PDP page', async ({ page }) => {
     // Define selectors for tabs and their content
     await page.waitForSelector('.product-details-tab__content', { state: 'visible' });
      const tabs = {
        productDetails: {
            tab: 'text="PRODUCT DETAILS"',
          content: '.product-details-tab__content'
        },
        fit: {
        tab: 'text="FIT"', 
        content: '.fit-tab' 
        },
        materialAndCare: {
          tab: 'text="MATERIAL & CARE INSTRUCTIONS"', 
          content: '.material-care-tab__grid' 
        },
        sustainability: {
          tab: 'text="SUSTAINABILITY"', 
          content: '.sustainability-tab__detail-content' 
      }
      };
      // Function to check tab content
      async function checkTab(tabSelector: string, contentSelector: string) {
        await page.click(tabSelector); // Click the tab to open it
        await page.waitForSelector(contentSelector); // Wait for the content to be visible
        const contentVisible = await page.isVisible(contentSelector);
        expect(contentVisible).toBe(true);
        console.log(`Content for ${tabSelector} is visible.`);
      }
      // Check each tab
      await checkTab(tabs.productDetails.tab, tabs.productDetails.content);
      await checkTab(tabs.fit.tab, tabs.fit.content);
      await checkTab(tabs.materialAndCare.tab, tabs.materialAndCare.content);
      await checkTab(tabs.sustainability.tab, tabs.sustainability.content);
});
test('Verify that changing color updates the product image', async ({ page }) => {
    // Define selectors for color options and product image
    await page.waitForSelector("[class^='w-'][class*='rounded-full']", { state: 'visible' });
    const colorOptionSelector = "[class^='w-'][class*='rounded-full']"; 
    const productImageSelector = ('//img[contains(@alt, \'.webp\')]'); // Selector for the product image
    const colorOption1Selector = `${colorOptionSelector}:nth-of-type(1)`; // First color option
    const colorOption2Selector = `${colorOptionSelector}:nth-of-type(2)`; // Second color option (for comparison)
    // Get the initial product image src
    const initialImageSrc = await page.locator(productImageSelector).getAttribute('src');
    if (initialImageSrc === null) {
      throw new Error('Failed to retrieve the initial product image src.');
    }
    // Select the first color option
    const colorOption1 = page.locator(colorOption1Selector);
    await colorOption1.click();
    // Wait for the product image to update
    await page.waitForTimeout(500); 
    // Get the updated product image src
    const updatedImageSrc = await page.locator(productImageSelector).getAttribute('src');
    if (updatedImageSrc === null) {
      throw new Error('Failed to retrieve the updated product image src.');
    }
    // Assert that the image src has changed (indicating the image was updated)
    expect(updatedImageSrc).not.toBe(initialImageSrc);
});
test('Verify notification appears and vanishes after adding to cart', async ({ page }) => {
      const addToCartButtonSelector = ("//button[@type='submit']"); 
      const notificationSelector = ("//div[@class='notification-title']");
      const addToCartButton = page.locator(addToCartButtonSelector);
      await addToCartButton.click();
      const notification = page.locator(notificationSelector);
      await notification.waitFor({ state: 'visible', timeout: 5000 }); 
      await expect(notification).toBeVisible();
      await expect(notification).toHaveText('Successfully added to cart'); 
      await page.waitForTimeout(5000);      
      await expect(notification).toBeHidden();
    });

test('Verify Add to Cart button is disabled when size and color are not selected', async ({ page }) => {
      const sizeOptionsSelector = 'div.product-detail__size-options > button'; 
      const colorOptionsSelector = "[class^='w-'][class*='rounded-full']";  
      const addToCartButtonSelector = ("//button[@type='submit']");
      const sizeOptions = page.locator(sizeOptionsSelector);
      const colorOptions = page.locator(colorOptionsSelector);
      await expect(sizeOptions).toHaveCount(0); 
      await expect(colorOptions).toHaveCount(0); 
      // Locate the Add to Cart button
      const addToCartButton = page.locator(addToCartButtonSelector);
      // Verify that the Add to Cart button is disabled
      await expect(addToCartButton).toBeDisabled();
      // Optionally, if you want to check the attribute directly
     // const isDisabled = await addToCartButton.getAttribute('disabled');
     // expect(isDisabled).toBe('true');
    });
test('Verify PDP window close when click on close button', async ({ page }) => {    
    const closButton = ".close-button-container__button"; 
    await page.click(closButton);
});
});