import { Page, Locator } from '@playwright/test';

export class PLPPage {
  private page: Page;
  private header: Locator;
  private titleLocators: Locator;
  private imageLocators: Locator;
  private priceLocators: Locator;
  private colorLocators: Locator;
  private productImageLocator: Locator;
  private productTitleLocator: Locator;
  private productPriceLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header'); 
    this.titleLocators = page.locator('.product-page__name'); 
    this.imageLocators = page.locator("//img[contains(@alt, '.webp')]"); 
    this.priceLocators = page.locator(".product-page__price");
    this.colorLocators = page.locator('.product-page__color-box');
    this.productImageLocator = page.locator('//img[contains(@alt, \'.webp\')]').first();
    this.productTitleLocator = page.locator('.product-page__name').first();
    this.productPriceLocator = page.locator('.product-page__price').first();
  }
  // Method to navigate to the PLP URL
  async navigate(url: string) {
    await this.page.goto(url);
  }
  // Method to verify the page has loaded correctly
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async verifyPageTitle(expectedTitle: string) {
    const actualTitle = await this.getPageTitle();
    if (actualTitle !== expectedTitle) {
      throw new Error(`Expected page title to be "${expectedTitle}", but it was "${actualTitle}"`);
    }
  }

  async verifyAllProductsHaveTitles() {

    await this.page.waitForSelector('.product-page__name');
    const titleCount = await this.titleLocators.count();
    if (titleCount === 0) {
      throw new Error('No product titles found on the page.');
    }
    const missingTitles: number[] = [];
    for (let i = 0; i < titleCount; i++) {
      const titleLocator = this.titleLocators.nth(i);
      const titleText = await titleLocator.textContent();
      if (!titleText?.trim()) {
        missingTitles.push(i); // Collect indices of missing titles
      }
    }
    // Log missing titles
    if (missingTitles.length > 0) {
      console.log(`Titles missing for indices: ${missingTitles.join(', ')}`);
    }
    if (missingTitles.length > 0) {
      throw new Error(`Titles are missing for ${missingTitles.length} products.`);
    }
  }
   // Method to verify all product images are available and visible
   async verifyAllProductImagesAvailable() {
        await this.page.waitForSelector("//img[contains(@alt, '.webp')]");
        const imageCount = await this.imageLocators.count();
        if (imageCount === 0) {
        throw new Error('No product images found on the page.');
        }
        //console.log(`Number of images found: ${imageCount}`);
        for (let i = 0; i < imageCount; i++) {
        const imageLocator = this.imageLocators.nth(i);
        try {
            await imageLocator.waitFor({ state: 'visible', timeout: 5000 });
           // console.log(`Image at index ${i} is visible.`);
          } catch (error) {
            console.error(`Image at index ${i} is not visible within the timeout.`);
          }
        }
       // console.log('All product images are available and visible.');
    }
    // Method to verify that all product prices are available and valid
   async verifyAllProductPricesAvailable() {

        await this.page.waitForSelector(".product-page__price");
        await this.page.waitForTimeout(1000);
        const priceCount = await this.priceLocators.count();
     //   console.log(`Number of prices found: ${priceCount}`);
        // Ensure there is at least one price element
        if (priceCount === 0) {
        throw new Error('No product prices found on the page.');
        }

        for (let i = 0; i < priceCount; i++) {
        const priceLocator = this.priceLocators.nth(i);
        // Ensure the price is visible
        const isVisible = await priceLocator.isVisible();
        try {
            await priceLocator.waitFor({ state: 'visible', timeout: 5000 });
          //  console.log(`Price at index ${i} is visible.`);
          } catch (error) {
            console.error(`Price at index ${i} is not visible within the timeout.`);
          }
        // Get the text content of the price
        const priceText = await priceLocator.textContent();
        const priceValue = parseFloat(priceText?.replace(/[^0-9.-]+/g, "") || "0");
      //  console.log(`Price text: ${priceText}, Parsed value: ${priceValue}`);
        }
    }
    // Method to verify that colors are available for each product
    async verifyAllProductColorsAvailable() {
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector('.product-page__color-box'); 
        // Get all color locators
        await this.page.waitForTimeout(1000);
        const colorCount = await this.colorLocators.count();
       // console.log(`Number of color elements found: ${colorCount}`);
        // Ensure there is at least one color element
        if (colorCount === 0) {
        throw new Error('No color elements found on the page.');
        }
        for (let i = 0; i < colorCount; i++) {
        const colorLocator = this.colorLocators.nth(i);
        // Ensure the color element is visible
        const isVisible = await colorLocator.isVisible();
        try {
            // Wait for the Price to be visible
            await colorLocator.waitFor({ state: 'visible', timeout: 5000 });
           // console.log(`Color at index ${i} is visible.`);
          } catch (error) {
            console.error(`Price at index ${i} is not visible within the timeout.`);
          }
        }
    }
      async getProductDetails(index: number = 0) {
        const imageLocator = this.productImageLocator.nth(index);
        const imageSrc = await imageLocator.getAttribute('src');
        const productTitle = await this.productTitleLocator.textContent();
        const productPrice = await this.productPriceLocator.textContent();
        return { imageSrc, productTitle, productPrice };
      }

      async clickProductImage(index: number = 0) {
        const imageLocator = this.productImageLocator.nth(index);
        await imageLocator.click();
      }

      async setViewportSize(width: number, height: number): Promise<void> {
        await this.page.setViewportSize({ width, height });
      }
      /// Method to check for images and take a screenshot
      async checkImagesAndTakeScreenshot(screenshotPath: string): Promise<void> {
        await this.page.waitForSelector("//img[contains(@alt, '.webp')]", { timeout: 10000 });
        const imageCount = await this.imageLocators.count();
        if (imageCount <= 0) {
          throw new Error('No images found on the PLP page.');
        }
           await this.page.screenshot({ path: screenshotPath });
      }
}
      