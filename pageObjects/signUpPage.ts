import PageHelpers from "../helpers/page.helper";
import {signUpLocators} from "./locators/signUpLocators";

const signUpPage: string = "https://app.circula.com/users/sign_up";
const errorColor: string = "rgb(234, 18, 11)";
const passColor: string = "rgb(66, 163, 68)";

export class SignUpPage {
  static async openSignUpPage() {
		await page.goto(signUpPage);
	  await PageHelpers.acceptCookiesFromLocalStorage();
		await PageHelpers.waitForPageToBeLoaded();
  }

	static async clickOnCountriesList() {
		await signUpLocators.countrySelector.click();
		await PageHelpers.waitForElements(signUpLocators.countriesInDropdown);
	}

	static async clickOnCountryByCountryName(country: string) {
		await signUpLocators.countryInDropdownByName(country).click();
		await signUpLocators.countrySelectorWithValue('Sweden').waitFor({state: "attached"});
	}
}

export class SignUpAssertions {
	static async shouldBeSwedenInCountryList() {
		let isSwedenInList = false;
		const countries = await signUpLocators.countriesInDropdown.all();
		for (const country of countries) {
			if (await country.innerText() === "Sweden") {
				isSwedenInList = true;
				break;
			}
		}

		await expect(isSwedenInList).toBeTrue("Sweden is not present in the country list");
	}

	static async swedenShouldBeSelected() {
		expect(await signUpLocators.countrySelector.getAttribute('value')).toEqual('Sweden');
	}
}
