import { test, expect } from '@playwright/test';


test.describe('LambdaTest Playground Demo', () => {
  
 
test('Simple Form Demo - validate message', async ({ page }) => {
  // 1. Go to Selenium Playground
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // 2. Click “Simple Form Demo”
  await page.click('text=Simple Form Demo');

  // 3. Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/.*simple-form-demo/);

  // 4. Create a variable for the string value
  const msg = 'Welcome to LambdaTest';

  // 5. Enter value in the “Enter Message” text box
  await page.fill('#user-message', msg);

  // 6. Click “Get Checked Value”
  await page.click('button:has-text("Get Checked Value")');

  // 7. Validate that the same message is displayed in the right-hand panel
  const displayed = await page.textContent('#message');
  expect(displayed).toContain(msg);
});

test('Drag & Drop Sliders - set slider to 95', async ({ page }) => {
  // 1. Open the Selenium Playground page
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // 2. Click “Drag & Drop Sliders”
  await page.click('text=Drag & Drop Sliders');

  // 3. Select the slider with default value 15
 // const slider = page.locator('//input[@type="range" and @value="15"]');
 // const slider = page.locator('//label[contains(normalize-space(.),"Default value 15")]/following::input[@type="range"][1]');
 const slider = page.locator('//h4[contains(.,"Default value 15")]/following-sibling::div//input[@type="range"]');
 //const slider = page.locator('h4:has-text("Default value 15") + input[type="range"]');

  await expect(slider).toBeVisible();

  // 4. Drag the slider to 95 (set via DOM)
  await slider.evaluate((el: HTMLInputElement) => {
    el.value = '95';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // 5. Validate whether the range value shows 95
  const value = await slider.evaluate((el: HTMLInputElement) => el.value);
  expect(value).toBe('95');
});

test('Scenario 3 - Input Form Submit (validate submission)', async ({ page }) => {
  // 1. Open the Input Form Demo page
  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');

  // 2. Click the Submit button without filling to validate an error (optional)
  await page.click('button:has-text("Submit")');

    // 3. Validate the browser error for the required "Name" field
  const nameLocator = page.locator('#name');

  // Ensure the field is attached
  await nameLocator.waitFor({ state: 'attached' });

  // 3a. The field should be invalid
  const isValid = await nameLocator.evaluate((el: HTMLInputElement) => el.checkValidity());
  expect(isValid).toBe(false);

  // 3b. Read the browser validationMessage
  const validationMessage = await nameLocator.evaluate((el: HTMLInputElement) => el.validationMessage || '');

  // 3c. Strict validation: must match exactly
  const EXPECTED_MESSAGE = 'Please fill in this field.';
  expect(validationMessage).toBe(EXPECTED_MESSAGE);

  // 4. Fill mandatory fields
  await page.fill('#name', 'Pratiksha G');
  await page.fill('#inputEmail4', 'pratiksha.bgollar@gmail.com');
  await page.fill('#inputPassword4', 'Pass123!');
  await page.fill('#company', 'Persistent');
  await page.fill('#websitename', 'https://example.com');

  // 5. Select country and fill remaining address fields
  await page.selectOption('select[name="country"]', { label: 'United States' });
  await page.fill('#inputCity', 'Pune');
  await page.fill('#inputAddress1', 'Street 1');
  await page.fill('#inputAddress2', 'Street 2');
  await page.fill('#inputState', 'MH');
  await page.fill('#inputZip', '411001');

  // 6. Click Submit
  await page.click('button:has-text("Submit")');

  const successMsg = page.locator('text=Thanks for contacting us, we will get back to you shortly.');

  // 7. Validate success message is visible
  await expect(successMsg).toBeVisible({ timeout: 5000 });
});
});

// test('launch google.com', async ({ page }) => {
//   await page.goto('https://google.com');
//   await expect(page).toHaveTitle(/Google/);
// });
