import { test , expect }  from '@playwright/test'


test.describe('orange HRM', () => {

    test.beforeEach('login page', async ({ page }) => {
 
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"); // goes to website
        await expect(page).toHaveTitle('OrangeHRM'); // checks if we are on right website

        await page.fill('[name="username"]',"Admin")
        await page.fill('[name="password"]',"admin123")
        await page.click('[type="submit"]')

    });


    test('adding employees and verfying in PIM', async ({ page }) => {

        await page.getByRole('link', { name: 'PIM' }).click(); // clicks on PIM
        await page.getByRole('link', { name: 'Add Employee' }).click(); // clicks on add employee

        await page.fill('[name="firstName"]','MAX') // adding first name
        await page.fill('[name="lastName"]','A') // adding lastname
        await page.locator('form').getByRole('textbox').nth(4).fill('011'); // adding ID
        await page.getByRole('button', { name: 'Save' }).click();//save button

        await page.getByRole('link', { name: 'Add Employee' }).click();
        await page.fill('[name="firstName"]','WAX')
        await page.fill('[name="lastName"]','B')
        await page.locator('form').getByRole('textbox').nth(4).fill('012');
        await page.getByRole('button', { name: 'Save' }).click();

        await page.getByRole('link', { name: 'Add Employee' }).click();
        await page.fill('[name="firstName"]','DAX')
        await page.fill('[name="lastName"]','C')
        await page.locator('form').getByRole('textbox').nth(4).fill('013');
        await page.getByRole('button', { name: 'Save' }).click();

        await page.getByRole('link', { name: 'Employee List' }).click();// clicks on employee list button
        await page.getByRole('textbox').nth(2).fill('011'); //add filter to find employee
        await page.getByRole('button', { name: 'Search' }).click(); // clicks on search
        await expect(page.getByText('MAX')).toBeVisible();// checks whether employee name is visible or not
        console.log("the employee name is visible") 

        await page.click(".oxd-userdropdown-tab")// clicks on dropdown arrow beside username
        await page.getByRole('menuitem', { name: 'Logout' }).click();//  clicks on logout

        await page.close() 
    })
})

