import * as core from "@actions/core";
import crowdin, { Credentials, TranslationsModel } from "@crowdin/crowdin-api-client";

// Initialize Crowdin Client with API key from secrets
const credentials: Credentials = {
  token: core.getInput("api_key"),
};
const {
  projectsGroupsApi,
  sourceFilesApi,
  translationsApi,
} = new crowdin(credentials);

async function getProjectFileIDs(projectID: number) {
  try {
    const response = await sourceFilesApi.listProjectFiles(projectID);
    return response.data.map((file) => {
      return file.data.id;
    });
  } catch (error) {
    core.error("Could not get file IDs: ");
    core.error(JSON.stringify(error, null, 2));
    return [];
  }
}

async function getProjectLanguageIDs(projectID: number) {
  try {
    const response = await projectsGroupsApi.getProject(projectID);
    return response.data.targetLanguageIds;
  } catch (error) {
    core.error("Could not get language IDs: ");
    core.error(JSON.stringify(error, null, 2));
    return [];
  }
}

async function preTranslationTMFromData(projectID: number, langIDs: string[], fileIDs: number[]) {
  const x: TranslationsModel.Method = "tm"; // Translational memory
  const request = {
    languageIds: langIDs,
    fileIds: fileIDs,
    method: x,
  };
  core.info("Requesting translations for the following languages:" + langIDs.toString());
  const res = await translationsApi.applyPreTranslation(projectID, request);
  return res;
}

async function run() {
  const projectID = parseInt(core.getInput("project_id"));
  const fIDs = await getProjectFileIDs(projectID);
  const lIDs = await getProjectLanguageIDs(projectID);
  const result = await preTranslationTMFromData(projectID, lIDs, fIDs);
  return result;
}

(async () => {
  try {
    const out = await run();
    core.info("Success! The information for the pre-translation TM run is: ");
    let string_rep = JSON.stringify(out, null, 2);
    core.info(string_rep);
  } catch (e) {
    let string_rep = JSON.stringify(e, null, 2);
    core.error("An error occurred at the top level: " + string_rep);
  }
  // `text` is not available here
})();
