# Playwright, Jest & Allure test example

## Setup and configuration

Run `npm install` to install dependencies.

Copy [.env.sample](.env.sample) to .env and change parameters as you wish.

You can also provide one of _chromium, firefox, webkit_ or all browsers in .env file. 
Use one of the separators: `,.;` to split browsers.

Run `npm test` command to run all tests

## Run in docker
Install [docker](https://docs.docker.com/engine/install/) first.

There are 2 options to run tests in docker:
- local code base with docker-compose
- run stored in docker image code

### Local code base
Clone this repository to your laptop/PC. Open its folder and install dependencies `npm install`. 

Run command `docker-compose up`.

### Run tests inside docker image
You don't need to clone the repo. 

Execute command: `docker run -it rvakazov/vakazov-playwright-docker-circula npm test`

It will pull the image and run tests automatically.

## Reporter

The `allure-reporter` is used for generating reports.

Use command `npm run allure_send` to send your allure reports to remote hub.

Allure server link: http://45.9.188.130:5035/en

To run allure-reports locally after test, you can use command `npm run allure_run`.

If reports server is already run, and you want to generate new reports (after tests),
there is a command `npm run allure_gen`.

There is no direct integration between allure-reporter, jest-playwright-preset and playwright 
as both of them use the same Jest's testEnvironment property. 

To implement integration I've forked the jest-playwright-preset's repository. 
Installed allure-reporter inside the project and extended its environment class by allure's environment.

It allows to have allure-reporter already integrated inside jest-playwright-preset.

This package is published in the npm with the name `jest-circus-playwright-allure`.

`CustomEnvironment` class implements automatic screenshot creation in case of test failures. 

## Multiple expectations in one test
If you have more than one _expect_ function in the test it might cause problems. 
Because test will be failed on first _expect_ failure and you can miss important information that 
something also is not working. 

To avoid such situations I've implemented simple softAssertion class to have multiple expectations in one test.

The usage: 

- create new instance of the class:

`const softAssertion = new SoftAssertion();`

- implement as many expects as you need using softAssertion's expect functions:

```
softAssertion.expect(...).toBeTrue("Custom error message");
softAssertion.expect(await locatore.innerText()).notToContainText(text, "Custom error message");
```

- after all expects assertAll function should be called:

`await softAssertion.assertAll();`

To show all collected error messages I've implemented one custom matcher in [CustomEnvironment.ts](CustomEnvironment.ts). 
It allows me to provide actual, expected and also error message to be shown instead of predefined one.

## Used technologies

[TypeScript](https://www.typescriptlang.org/)

[Playwright](https://playwright.dev/)

[Jest](https://jestjs.io/)

[Allure-reporter](jest-allure-circus)

[jest-playwright-preset](https://www.npmjs.com/package/jest-playwright-preset) 

[Fork of jest-playwright-preset](https://www.npmjs.com/package/jest-circus-playwright-allure)
