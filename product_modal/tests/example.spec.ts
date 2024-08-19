import { test, expect } from '@playwright/test';

const viewports = [
    { name: 'Mobile', width: 375, height: 667 }, // iPhone 6/7/8
    { name: 'Tablet', width: 768, height: 1024 }, // iPad
    { name: 'Desktop', width: 1440, height: 900 } // Desktop
  ];
  
  test.describe('PLP Responsive Design Tests', () => {
  
    viewports.forEach(({ name, width, height }) => {
      test(`PLP should display correctly on ${name}`, async ({ page }) => {
        // Set viewport size
        await page.setViewportSize({ width, height });
  
        // Navigate to the PLP
        await page.goto('http://localhost:8080');
        const title = await page.title();
       // expect(title).toBe('product_modal')
        await page.waitForSelector("//img[contains(@alt, '.webp')]");
        // Get all image locators
        const imageLocators = page.locator("//img[contains(@alt, '.webp')]");
        const imageCount = await imageLocators.count();
        console.log(imageCount);
        expect(imageCount).toBeGreaterThan(0);
        console.log('PLP Success');
        await page.screenshot({ path: `screenshots/plp-${name}.png` });
      });
    });
});
     test.describe('PLP Tests', () => {

    // Define the base URL for the PLP
    const baseUrl = 'http://localhost:8080'; 
  
    // Hook to run before each test
    test.beforeEach(async ({ page }) => {
      await page.goto(baseUrl);
    });
 
    test('Verify Page Title', async ({ page }) => {
       
        const title = await page.title();
        expect(title).toBe('product_modal'); 
        console.log('Page title is:', title);
    });
    test('Verify All Products should have titles', async ({ page }) => {
        await page.waitForSelector('.product-page__name'); 
        //Get all title locators
        const titleLocators = page.locator('.product-page__name'); 
        // Ensure there is at least one title element
        const titleCount = await titleLocators.count();
        expect(titleCount).toBeGreaterThan(0);
        const missingTitles: number[] = [];
        //Check each title
        for (let i = 0; i < titleCount; i++) {
        const titleLocator = titleLocators.nth(i);
        // Ensure the title is visible
        await expect(titleLocator).toBeVisible();
        // Get the text content of the title
        const titleText = await titleLocator.textContent();
        console.log(titleText);
        if (!titleText?.trim()) {
            missingTitles.push(i); // Collect indices of missing titles
            }
            expect(missingTitles.length).toBe(0);
    
            if (missingTitles.length > 0) {
            console.log(`Titles missing for indices: ${missingTitles.join(', ')}`);
            }
        // Assert the title is not empty
        // expect(titleText?.trim().length).toBeGreaterThan(0);
        }
});

    test('Verify All Product Images Available in PLP', async ({ page }) => {

         await page.waitForSelector("//img[contains(@alt, '.webp')]");
         // Get all image locators
         const imageLocators = page.locator("//img[contains(@alt, '.webp')]");
         const imageCount = await imageLocators.count();
         console.log(imageCount);
         expect(imageCount).toBeGreaterThan(0);
         console.log('PLP Success');
         for (let i = 0; i < imageCount; i++) {
            const imageLocator = imageLocators.nth(i);
         // Ensure the image is visible
            await expect(imageLocator).toBeVisible();
        }
    });
    test('Verify All Product Price Available in PLP', async ({ page }) => {
        //await page.waitForTimeout(1000); 
        await page.waitForSelector(".product-page__price");
        await page.waitForTimeout(1000); 
         // Get all Price locators
        const priceLocators = page.locator(".product-page__price");
        const priceCount = await priceLocators.count();
        console.log(priceCount);
        expect(priceCount).toBeGreaterThan(0);
            for (let i = 0; i < priceCount; i++) {
                 const priceLocator = priceLocators.nth(i);
                // Ensure the prcie is visible
                 await expect(priceLocator).toBeVisible();
                 const priceText = await priceLocator.textContent();
                // Parse the price text to a float value 
                 const priceValue = parseFloat(priceText?.replace(/[^0-9.-]+/g, "") || "0");
                 console.log(priceText);
                 expect(priceValue).toBeGreaterThan(0);
     }
    });
    test('Verify that Colors on PLP should be available for each product', async ({ page }) => {
        await page.waitForSelector('.product-page__color-box'); // Replace with the correct selector for color elements
        // Step 3: Get all color locators
        const colorLocators = page.locator('.product-page__color-box'); // Adjust the selector based on your HTML structure
        // Ensure there is at least one color element
        const colorCount = await colorLocators.count();
        expect(colorCount).toBeGreaterThan(0);
        // Step 4: Check each color
        for (let i = 0; i < colorCount; i++) {
        const colorLocator = colorLocators.nth(i);
        // Ensure the color element is visible
        await expect(colorLocator).toBeVisible();
        // Optionally, you can verify the color by checking its background color or other attributes
        const backgroundColor = await colorLocator.evaluate(el => getComputedStyle(el).backgroundColor);
        // Assert that the background color is not the default or transparent
        expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Check for transparency or default color
        expect(backgroundColor).not.toBe('transparent'); // Check for transparency
    }
});
    test('Verify image of product changes when change color from PLP', async ({ page }) => {
        const productSelector = ('//img[contains(@alt, \'.webp\')]'); 
        await page.waitForSelector(productSelector);
        // Locate and capture the initial product image
        const imageLocator = page.locator('//img[contains(@alt, \'.webp\')]'); 
        const imageCount = await imageLocator.count();
        // Ensure there is at least one image
        expect(imageCount).toBeGreaterThan(0);
        // Access the first image
        const initialImageLocator = imageLocator.nth(0); 
        const initialImageSrc = await initialImageLocator.getAttribute('src');
        // Locate and click on a color option
        const colorOptionSelector = '.product-page__color-box'; 
        const colorOptionsLocator = page.locator(colorOptionSelector);
        const colorOptionsCount = await colorOptionsLocator.count();
        expect(colorOptionsCount).toBeGreaterThan(0);
        // Click on the first color option 
        await colorOptionsLocator.nth(0).click();
        // Wait for the image to update
        await page.waitForTimeout(1000); 
        // Verify that the image source has changed
        const updatedImageSrc = await initialImageLocator.getAttribute('src');
        if (updatedImageSrc === initialImageSrc) {
            console.log('Image not changing when changing color.');
            // Optionally, you could fail the test if the image did not change
            expect(updatedImageSrc).not.toBe(initialImageSrc);
        } else {
            console.log('Image successfully updated after color change.');
        }
        //expect(updatedImageSrc).not.toBe(initialImageSrc);
        // Verify that the updated image source is valid
        expect(updatedImageSrc).not.toBeNull();
        // await page.goto(updatedImageSrc); 
    });
        test('Verify Same Product open in PDP when click product from PLP', async ({ page }) => {
            const productImageLocator = page.locator('//img[contains(@alt, \'.webp\')]').first(); 
            const productTitleLocator = page.locator('.product-page__name').first(); 
            const productPriceLocator = page.locator('.product-page__price').first(); 
            // Capture product details from PLP
            const imageSrc = await productImageLocator.getAttribute('src');
            const productTitlePLP = await productTitleLocator.textContent();
            const productPricePLP = await productPriceLocator.textContent();
            console.log(`Product title on PLP: ${productTitlePLP}`);
            console.log(`Product price on PLP: ${productPricePLP}`);
            // const imageSelector = "//img[@alt='BORDEAUX-2.webp']"; 
            await productImageLocator.click();
            // Wait for the image to be visible and click on it
            // await page.waitForSelector(imageSelector);
            // await page.click(imageSelector);
            const productViewContainerSelector = "//div[@id='app']//section[@class='shared-modal__content']//div[@class='close-button-container']"; 
            await page.waitForSelector(productViewContainerSelector, { state: 'visible' });
            const isVisible = await page.isVisible(productViewContainerSelector);
            expect(isVisible).toBe(true);
            await page.waitForTimeout(10000)
            const  productTitlePDP = '.product-detail__name'; 
            const articleName = await page.textContent(productTitlePDP);
            console.log(`PDP Article Name: ${articleName}`);
            const articlePriceSelector = '.product-detail__price'; 
            const articlePrice = await page.textContent(articlePriceSelector);
            console.log(`Article Price: ${articlePrice}`);
            const  productPdpImage = page.locator('//img[contains(@alt, \'.webp\')]');
            const imagepdpSrc = await productPdpImage.getAttribute('src');
            expect(articleName).toBe(productTitlePLP);
            expect(articlePrice).toBe(productPricePLP);
            expect(imagepdpSrc).toBe(imageSrc);
    });

});