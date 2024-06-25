import "jest-allure-circus";
import {SignUpAssertions, SignUpPage} from "../pageObjects/signUpPage";

describe("Sign up tests: ", () => {
	test("Sweden should be in the country list", async () => {
		await allure.step("Open sign up page", async () => {
			await SignUpPage.openSignUpPage();
		});

		await allure.step("Click on country selector button", async () => {
			await SignUpPage.clickOnCountriesList();
		});

		await allure.step("Check that Sweden is in the list", async () => {
			await SignUpAssertions.shouldBeSwedenInCountryList();
		});
	});

	test("It should be possible to select Sweden", async () => {
		await allure.step("Click on Sweden in the countries dropdown", async () => {
			await SignUpPage.clickOnCountryByCountryName('Sweden');
		});

		await allure.step("Check that Sweden was selected", async () => {
			await SignUpAssertions.swedenShouldBeSelected();
		});
	});
});
