const PlaywrightEnvironment = require('jest-circus-playwright-allure/lib/PlaywrightEnvironment').default;

// Sets custom environment to automatically take screenshots if test failed
export default class CustomEnvironment extends PlaywrightEnvironment {
  async setup() {
    await super.setup()
  }

  async teardown() {
    await super.teardown()
  }

  // handle test fails to take screenshot and automatically attach to allure reports
  async handleTestEvent(event: any) {
    await super.handleTestEvent(event);

    if (event.name === 'test_done' && event.test.errors.length > 0) {
      const screenshot = await this.global.page.screenshot();
      await this.global.allure.attachment("screenshot", screenshot, 'image/png');
    }
  }
}
