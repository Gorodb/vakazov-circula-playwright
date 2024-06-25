import {Locator} from "playwright";
import "jest";
import "../customMatchers";
import {ContentType} from "jest-allure-circus";

const defaultWaitTime: number = process.env.DEFAULT_WAIT ? parseInt(process.env.DEFAULT_WAIT) : 5000;

export default class PageHelpers {
	static async waitForPageToBeLoaded() {
		await page.waitForLoadState('networkidle');
	}

	static async waitForDomToBeLoaded() {
		await page.waitForLoadState('domcontentloaded');
	}

	static async makeAllureScreenshot(name = 'screenshot'): Promise<void> {
		try {
			const screenshot = await page.screenshot({fullPage: true});
			allure.attachment(name, screenshot, ContentType.JPEG);
		} catch (err) {
			console.error(err);
		}
	}

	static async makeElementsScreenshot(locator: Locator): Promise<Buffer | void> {
		try {
			await locator.waitFor({state: "visible"});
			await this.scrollToElement(locator);
			return locator.screenshot();
		} catch (e) {
			console.error(e)
			await this.makeAllureScreenshot();
		}
	}

	static async elementsCount(locator: Locator): Promise<number> {
		try {
			await this.waitForElements(locator);
			return (await locator.all()).length;
		} catch (err) {
			console.log(err);
			return 0
		}
	}

	static async scrollToElement(locator: Locator): Promise<void> {
		try {
			await locator.scrollIntoViewIfNeeded()
		} catch (err) {
			console.info(err)
		}
	}

	static async fill(locator: Locator, text: string, withWait?: boolean, timeout = defaultWaitTime): Promise<void> {
		if (withWait) {
			await this.waitForLocator(locator, timeout);
		}

		try {
			await locator.clear();
			await locator.fill(text);
		} catch (e) {
			console.error(e);
			await expect(true).toBeFalse(`Could not type '${text}' by locator '${locator}'`)
		}
	}

	static async getElementByInx(locator: Locator, inx: number): Promise<any> {
		try {
			return (await locator.all())[inx]
		} catch (err: any) {
			await expect(true).toBeFalse(err)
		}
	}

	static async clickByIndex(locator: Locator, inx: number, withWait?: boolean, timeout?: number): Promise<void> {
		if (withWait) await this.waitForElements(locator, timeout);
		try {
			await (await this.getElementByInx(locator, inx)).click();
		} catch (err: any) {
			console.log(err);
		}
	}

	static async waitForLocator(locator: Locator, timeout?: number, errorMessage?: string) {
		const waitTime = timeout || defaultWaitTime
		try {
			await locator.waitFor({state: "attached", timeout: waitTime})
		} catch (error) {
			await this.makeAllureScreenshot()
			console.error(errorMessage || `Element has not appeared after ${waitTime} ms. \r\n ${errorMessage}`)
		}
	}

	static async waitForPopUp(locator: Locator) {
		const popupPromise = page.waitForEvent('popup');
		await locator.click();
		return await popupPromise;
	}

	static async waitForElements(locator: Locator, timeout = defaultWaitTime): Promise<Locator[] | void> {
		await locator.first().waitFor({state: "visible", timeout});
	}

	static async clearCookies() {
		try {
			await context.clearCookies();
			await page.reload()
		} catch (e) {
			console.error(e);
		}
	}

	static async acceptCookiesFromLocalStorage(): Promise<void> {
		await page.evaluate(() => {
			window.localStorage.setItem('uc_user_interaction', 'true');
		});
		await page.reload({waitUntil: 'networkidle'})
	}
}
