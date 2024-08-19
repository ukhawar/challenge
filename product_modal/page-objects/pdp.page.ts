import { Page, Locator, expect } from '@playwright/test';

export class PDPPage {
  private page: Page;
  private productTitleLocator: Locator;
  private productPriceLocator: Locator;
  private productImageLocator: Locator;
  private articlePriceSelector: Locator;
  private colorOptionSelector: Locator;
  private articleNameSelector: Locator;
  private sizeOptionSelector: Locator;
  private selectedSizeDisplaySelector: Locator;
  private colorOptionSelectorPdp: string = "[class^='w-'][class*='rounded-full']";
  private productImageSelectorPdp: string = '//img[contains(@alt, \'.webp\')]';
  private addToCartButton: Locator;
  private notification: Locator;
  private sizeValueLocator: Locator;
  private addToCartButtonLocator: Locator;
  private sizeButtonSelector: Locator;
  private closeButton: Locator;

  private tabs = {
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

  constructor(page: Page) {
    this.page = page;
    // Define locators for PDP
    this.productTitleLocator = page.locator('.product-detail__name');
    this.productPriceLocator = page.locator('.product-detail__price');
    this.productImageLocator = page.locator('//img[contains(@alt, \'.webp\')]').first();
    this.articlePriceSelector = page.locator('.product-detail__price');
    this.colorOptionSelector = page.locator('.product-detail__color-value');
    this.articleNameSelector = page.locator('.product-detail__name');
    this.sizeOptionSelector = page.locator('div.product-detail__size-options > button');
    this.selectedSizeDisplaySelector = page.locator('.product-detail__size-value');
    this.addToCartButton = page.locator("//button[@type='submit']");
    this.notification = page.locator("//div[@class='notification-title']");
    this.addToCartButton = page.locator("//button[@type='submit']");
    this.sizeValueLocator = page.locator('.product-detail__size-value');
    this.addToCartButtonLocator = page.locator("//button[@type='submit']");
    this.sizeButtonSelector = page.locator('.product-detail__size-options > button');
    this.closeButton = page.locator('.close-button-container__button');
    
  }

  // Method to verify that the PDP is visible
  async verifyPDPVisible() {
    const productViewContainerSelector = "//div[@id='app']//section[@class='shared-modal__content']//div[@class='close-button-container']";
    await this.page.waitForSelector(productViewContainerSelector, { state: 'visible' });
    const isVisible = await this.page.isVisible(productViewContainerSelector);
    expect(isVisible).toBe(true);
  }
  async getProductDetails() {
    const productTitle = await this.productTitleLocator.textContent();
    const productPrice = await this.productPriceLocator.textContent();
    const imageSrc = await this.productImageLocator.getAttribute('src');
    return { productTitle, productPrice, imageSrc };
  }
    // Method to verify the article price on PDP
    async verifyArticlePrice() {
        await this.articlePriceSelector.waitFor({ state: 'visible' });
        // Get the article price text content
        const articlePrice = await this.articlePriceSelector.textContent();
        // Ensure the article price is not null or empty
        expect(articlePrice).not.toBeNull();
        expect(articlePrice?.trim()).not.toBe('');
      }
      // Method to verify color options on PDP
  async verifyColorOptions() {
        // Wait for the color options to be visible
        await this.colorOptionSelector.waitFor({ state: 'visible' });
        // Locate all color options
        const colorOptions = await this.colorOptionSelector.elementHandles();
        expect(colorOptions.length).toBeGreaterThan(0);
        // Check that each color option is visible and interactable
        for (const colorOption of colorOptions) {
        const isVisible = await colorOption.isVisible();
        const isEnabled = await colorOption.isEnabled();
        const colorText = await colorOption.textContent()
        // Validate visibility and interactability
        expect(isVisible).toBe(true);
        expect(colorText?.trim()).not.toBe('');
       // console.log(`Color: ${colorText?.trim()}, Visible: ${isVisible}, Enabled: ${isEnabled}`);
        }
    }
    // Method to verify the article name on PDP
  async verifyArticleName() {
        await this.articleNameSelector.waitFor({ state: 'visible' });
        // Retrieve the text content of the article name
        const articleName = await this.articleNameSelector.textContent();
        //console.log(`Article name: ${articleName}`);
        // Validate that the article name is not null
        expect(articleName).not.toBeNull();
    
  }
  // Method to select a size and verify the selection
  async verifySizeSelection() {
        await this.page.waitForTimeout(10000);
        // Locate all size options
        const sizeOptions = this.sizeOptionSelector;
        // Ensure there is at least one size option available
        const count = await sizeOptions.count();
        expect(count).toBeGreaterThan(0);
        let sizeOptionToClick: Locator | null = null;
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
        await this.page.waitForTimeout(500); 
        // Verify that the selected size is displayed correctly
        await expect(this.selectedSizeDisplaySelector).toHaveText(selectedSizeText.trim());
    }

    private async checkTab(tabSelector: string, contentSelector: string) {
        await this.page.waitForSelector(tabSelector, { state: 'visible' });
        await this.page.click(tabSelector); // Click the tab to open it
        await this.page.waitForSelector(contentSelector, { state: 'visible' }); 
        const contentVisible = await this.page.isVisible(contentSelector);
        expect(contentVisible).toBe(true);
       // console.log(`Content for ${tabSelector} is visible.`);
      }

      async verifyAllTabs() {
        await this.checkTab(this.tabs.productDetails.tab, this.tabs.productDetails.content);
        await this.checkTab(this.tabs.fit.tab, this.tabs.fit.content);
        await this.checkTab(this.tabs.materialAndCare.tab, this.tabs.materialAndCare.content);
        await this.checkTab(this.tabs.sustainability.tab, this.tabs.sustainability.content);
      }

      async getInitialProductImageSrc(): Promise<string> {
        await this.page.waitForSelector(this.productImageSelectorPdp, { state: 'visible' });
        const productImage = this.page.locator(this.productImageSelectorPdp).first();
        const initialImageSrc = await productImage.getAttribute('src');
        if (initialImageSrc === null) {
          throw new Error('Failed to retrieve the initial product image src.');
        }
        return initialImageSrc;
      }

      async selectColorOption(index: number) {
        const colorOptionSelector = `${this.colorOptionSelectorPdp}:nth-of-type(${index + 1})`;
        const colorOption = this.page.locator(colorOptionSelector);
        await colorOption.click();
      }

      async getUpdatedProductImageSrc(): Promise<string> {
        await this.page.waitForSelector(this.productImageSelectorPdp, { state: 'visible' });
        const productImage = this.page.locator(this.productImageSelectorPdp).first();
        // Get the updated product image src
        const updatedImageSrc = await productImage.getAttribute('src');
        if (updatedImageSrc === null) {
          throw new Error('Failed to retrieve the updated product image src.');
        }
        return updatedImageSrc;
      }

      async addToCart() {
        await this.addToCartButton.click();
      }

      async waitForNotification() {
        await this.notification.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.notification).toBeVisible();
        await expect(this.notification).toHaveText('Successfully added to cart');
      }

      async waitForNotificationToDisappear() {
        await this.page.waitForTimeout(5000);
        await expect(this.notification).toBeHidden();
      }

      async isSizeSelected(): Promise<boolean> {
        const sizeValue = await this.sizeValueLocator.textContent();
        return sizeValue?.trim() !== '';
      }
    
      async isAddToCartButtonDisabled(): Promise<boolean> {
        return await this.addToCartButtonLocator.evaluate((button) => {
          // Ensure that button is an HTML element and check for the disabled property
          return button instanceof HTMLButtonElement && button.disabled;
        });
        }

       async verifyAddToCartButtonDisabledWhenSizeNotSelected() {
            const sizeSelected = await this.isSizeSelected();
            if (!sizeSelected) {
              const isDisabled = await this.isAddToCartButtonDisabled();
              if (!isDisabled) {
                throw new Error('Add to Cart button should be disabled when no size is selected.');
              }
            } else {
              throw new Error('Size is selected, but the test case is for no size selected.');
            }
          }
        async checkSizeOptions(expectedSizes: string[]): Promise<void> {
            const sizeButtons = await this.sizeButtonSelector.elementHandles();
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
           // console.log('Size Statuses:');
            sizeStatus.forEach(({ size, isVisible, isEnabled }) => {
           // console.log(`Size: ${size}, Visible: ${isVisible}, Enabled: ${isEnabled}`);
            });
            // Create sets for available and not available sizes
            const availableSizes = sizeStatus
            .filter(({ isVisible, isEnabled }) => isVisible && isEnabled)
            .map(({ size }) => size);
            const unavailableSizes = sizeStatus
            .filter(({ isVisible, isEnabled }) => !isVisible || !isEnabled)
            .map(({ size }) => size);
            
            // Log available and unavailable sizes
           // console.log('Available and interactable sizes:', availableSizes);
           /// console.log('Not available or not interactable sizes:', unavailableSizes);
            expect(availableSizes.length).toBeGreaterThan(0);
            // Check that the expected sizes are either available or not
            expectedSizes.forEach(size => {
            if (!availableSizes.includes(size) && !unavailableSizes.includes(size)) {
                console.error(`Expected size "${size}" is neither available nor interactable.`);
            }
    });
  }
    // Method to click the close button
        async closePDP(): Promise<void> {
            await this.closeButton.click(); // Click the close button
        }
}