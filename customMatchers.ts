import { expect } from "@jest/globals";

interface CustomMatchers<R = unknown> {
  toBeTrue(errorMessage?: string): Promise<R>;
  toBeFalse(errorMessage?: string): Promise<R>;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

export default expect.extend({
  async toBeTrue(actual, errorMessage) {
    const pass = actual === true;
    if (pass) {
      return {
        message: () => errorMessage || `'${actual}' is not equal 'false'`,
        pass: true,
      };
    }
    return {
      message: () => errorMessage || `'${actual}' is not equal 'true'`,
      pass: false,
    };
  },
  async toBeFalse(actual, errorMessage) {
    const pass = actual === false;
    if (pass) {
      return {
        message: () => errorMessage || `'${actual}' is not equal 'true'`,
        pass: true,
      };
    }
    return {
      message: () => errorMessage || `'${actual}' is not equal 'false'`,
      pass: false,
    };
  },
});
