# Brief Description

These are my autotests which I've written for ["Rozetka"](https://rozetka.com.ua/ua/). It was my test task given by ["Pecode"](https://pecodesoftware.com/) company. I choosed the `Cypress` framework to complete the task just because it's comfortable enough for me.

# Technologies

My tests were created with the following technologies:

-  Cypress: ^12.17.0
-  Cypress-mochawesome-reporter: ^3.5.1

# Installation

## Pre-conditions

**NodeJS** must be installed on your operating system.
Run the following commands to check your versions of packages:

```
node -v (v18.16.0 recommended)
```

```
nmp -v (v9.5.1 recommended)
```

## Plugins

You should install the following plugins:

-  **Prettier**

## Install dependencies

```
npm install
```

# Tests running

Run the following commands to start running different test cases:

|           Command           |                  Test Case                   | Expected Result | Total Tests |               Test File                |
| :-------------------------: | :------------------------------------------: | :-------------: | :---------: | :------------------------------------: |
|     `npm run test:cart`     |           Add items to the basket            |    Passed ✅    |     19      |    cypress/e2e/CartTest.spec.cy.js     |
|    `npm run test:filter`    | Verify if the price filter working correctly |    Passed ✅    |     14      |   cypress/e2e/FilterTest.spec.cy.js    |
| `npm run test:search_input` |               Search the item                |    Passed ✅    |      6      | cypress/e2e/SearchInputTest.spec.cy.js |
|    `npm run test:login`     |   Login using Environment Variables (mine)   |    Failed ❌    |      4      |    cypress/e2e/LoginTest.spec.cy.js    |
|     `npm run test:all`      |    **Run all the tests in `headed` mode**    |        -        |      -      |                   -                    |
| `npm run test:all_headless` |   **Run all the tests in `headless` mode**   |        -        |      -      |                   -                    |

# Reporter

As soon as the test run is finished, `Cypress-mochawesome-reporter` will automatically generate and open test results.

# Afterwords

## Details

Rozetka have so many ways to use their website. It's have a really big number of conditions. Each page can heavily differ from the other one. Obviously, i didn't want to provide "flaky" tests for you. So i choose concrete ways for each test case. For example, in `cypress/e2e/CartTest.spec.cy.js` i needed to add product to my cart, and i did it from the specific "Televizors" Category. Only a product is randomly chosen, not a category. By the way, I needed to verify that price in the cart is calculated correctly. But for some reason you can't just get the quantity of the product you've added to the basket from the DOM. So I intercepted the request with the parameter i needed via `cy.intercept()`. It made possible for me to wrote the autotest that meet your requirements.

## Directory structure

-  **e2e** - contains test files. Every file related to the specific test case.
-  **pageobjects** - contains the page selectors.
-  **reports** - you won't have this folder from the box, but you will. There will store reports after runs.
-  If screenshots were taken via the cy.screenshot() command or automatically when a test fails, the screenshots are stored in the screenshots folder which is set to **cypress/screenshots** by default.
-  **cypress/videos** - default folder for recorded tests failures.
-  **support** folder includes:
   -  `commands.js` - "Uncaught: Type Error" that appears on ["Rozetka"](https://rozetka.com.ua/ua/) stops the test run automatically, so I had to write the exeption for that here.
-  `cypress.env.json` - the environment variables are written here.
-  `cypress.config.js` - the first time you open Cypress Test Runner, it creates the `cypress.config.js` configuration file. This file is used to store any configuration values you supply.
-  `.prettierrc` - the configuration for "Prettier" plugin.
