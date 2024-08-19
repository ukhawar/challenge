import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  testDir: './tests', // Directory where your test files are located
  use: {
    headless: false, // Set to false if you want to see the browser action
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20000,
    ignoreHTTPSErrors: true,

  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
    {
      name: 'Mobile',
     use: { ...devices['Pixel 5'] },
  },
    {
     name: 'Tablet',
    use: { ...devices['iPad'] },
    },
  ],
  reporter: [
    ['list'], // Use the list reporter
    ['json', { outputFile: 'test-results/results.json' }], // JSON report
    ['html', { outputFolder: 'test-results/report' }] // HTML report
  ],
});
