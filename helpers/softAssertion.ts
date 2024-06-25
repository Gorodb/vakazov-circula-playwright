import DataHelper from "./data.helper";

interface IExpect {
  toBeTrue: (errorMessage?: string) => void;
  toBeFalse: (errorMessage?: string) => void;
  toEqual: (value: any, errorMessage?: string) => void;
  notToEqual: (value: any, errorMessage?: string) => void;
  toContainText: (text: string, errorMessage?: string) => void;
  notToContainText: (text: string, errorMessage?: string) => void;
  toBeGreater: (value: number, errorMessage?: string) => void;
}

export default class SoftAssertion {
  constructor() {
    this.isFail = false;
    this.errors = [];
  }
  private isFail: boolean;
  private errors: string[];

  expect(actual: any): IExpect {
    const toBeTrue = (errorMessage?: string) => {
      if (!actual) {
        errorMessage = errorMessage ? errorMessage : "Expected true but got false";
        this.setFail(`✘ ${errorMessage}`)
      }
    }

    const toBeFalse = (errorMessage?: string) => {
      if (actual) {
        errorMessage = errorMessage ? errorMessage : "Expected false but got true";
        this.setFail(`✘ ${errorMessage}`)
      }
    }

    const toEqual = (expected: any, errorMessage?: string) => {
      if (actual !== expected) {
        errorMessage = errorMessage ? errorMessage : `Expected: ${expected}, but got: ${actual}`;
        console.error(errorMessage);
        this.setFail(`✘ ${errorMessage}`)
      }
    }

    const notToEqual = (expected: any, errorMessage?: string) => {
      if (actual === expected) {
        errorMessage = errorMessage ? errorMessage : `Expected: ${expected}, but got: ${actual}`;
        console.error(errorMessage);
        this.setFail(`✘ ${errorMessage}`)
      }
    }

    const toContainText = (expected: string, errorMessage?: string) => {
      if (!DataHelper.clearString(actual).includes(DataHelper.clearString(expected))) {
        errorMessage = errorMessage ? errorMessage : `Expected: ${expected}, to contain text: ${actual}`;
        console.error(errorMessage);
        this.setFail(`✘ ${errorMessage}`)
      }
    }

    const notToContainText = (expected: string, errorMessage?: string) => {
      if (actual.includes(expected)) {
        errorMessage = errorMessage ? errorMessage : `Expected: ${expected}, not to contain text: ${actual}`;
        console.error(errorMessage);
        this.setFail(`✘ ${errorMessage}`)
      }
    }

    const toBeGreater = (expected: number, errorMessage?: string) => {
      if (actual < expected) {
        errorMessage = errorMessage ? errorMessage : `Expected: ${expected}, to be greater then: ${actual}`;
        console.error(errorMessage);
        this.setFail(`✘ ${errorMessage}`)
      }
    }

    return {
      toBeTrue,
      toBeFalse,
      toEqual,
      notToEqual,
      toContainText,
      notToContainText,
      toBeGreater
    }
  }

  async assertAll() {
    if (this.isFail) {
      console.error(this.errors.join('\r\n'))
    }
    await expect(this.isFail).toBeFalse(this.errors.join('\r\n'))
  }

  private setFail(errorMessage: string) {
    this.isFail = true;
    this.errors.push(errorMessage);
  }
}
