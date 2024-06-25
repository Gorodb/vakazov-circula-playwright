import { existsSync, unlinkSync } from "fs";
import { pack } from "7zip-min";

import requests from "./api/requests/allureRequests";

const archiveAllureBy7Zip = async (folder: string): Promise<void> => {
  const fileName = `${folder}.zip`;
  const projectDescription = process.env.PROJECT_DESC || "Circula test examples";
  const project = process.env.PROJECT_NAME || "circula";

  await requests.createProject(project, "circula-web", projectDescription);

  // @ts-ignore
  pack(folder, fileName, async (err: Error) => {
    if (err) {
      console.info(err);
    }
    await requests.allureSend(project, fileName, "allure-results.7z");
    if (existsSync(fileName)) {
      unlinkSync(fileName);
    }
  });
};

(async () => {
  console.log(`Sending reports to the remote hub`);
  await archiveAllureBy7Zip("./allure-results");
  console.log(`Reports hub: ${process.env.API_ALLURE_URL}/en`);
  console.log(`Reports are generated and available by url: ${process.env.API_ALLURE_URL}/web/allure/${process.env.PROJECT_NAME}/`);
})();
