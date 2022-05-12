import * as core from "@actions/core";
import crowdin, { Credentials, TranslationsModel } from "@crowdin/crowdin-api-client";

// credentials
const credentials: Credentials = {
  token: core.getInput("api_key"),
};

// initialization of crowdin client
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
    console.error(error);
    return [];
  }
}

async function getProjectLanguageIDs(projectID: number) {
  try {
    const response = await projectsGroupsApi.getProject(projectID);
    return response.data.targetLanguageIds;
  } catch (error) {
    console.error(error);
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
  console.log(request.languageIds);
  const res = await translationsApi.applyPreTranslation(projectID, request);
  console.log("Finished pre-translation!");
  console.log(res);
  return res;
}

async function run() {
  const projectID = parseInt(core.getInput("project_id"));
  const fIDs = await getProjectFileIDs(projectID);
  const lIDs = await getProjectLanguageIDs(projectID);
  const result = await preTranslationTMFromData(projectID, lIDs, fIDs);
  console.log("Finished!");
  console.log(result);
}

(async () => {
  try {
    const output = await run();
    console.log("Success! The information for the pre-translation TM run is:");
    console.log(output);
  } catch (e) {
    console.error("An error occurred at the top level:");
    console.error(e);
  }
  // `text` is not available here
})();
