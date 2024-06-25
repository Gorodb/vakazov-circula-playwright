import {config} from "dotenv";

config();

(async () => {
  const defaultTimeout = process.env.DEFAULT_TIMEOUT ? parseInt(process.env.DEFAULT_TIMEOUT) : 10000;
  const defaultNavigationTimeout = process.env.DEFAULT_NAVIGATION_TIMEOUT ? parseInt(process.env.DEFAULT_NAVIGATION_TIMEOUT) : 10000;

  // default timeouts
  page.setDefaultTimeout(defaultTimeout);
  page.setDefaultNavigationTimeout(defaultNavigationTimeout);
})();
