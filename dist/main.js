"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crowdin_api_client_1 = __importDefault(require("@crowdin/crowdin-api-client"));
// credentials
const credentials = {
    // TODO: Invalidate this credential
    token: "78c16095819050e36b39d64b0221a38d1321158a2b783cd6149aebc34c0df538f37ae8d0c85721a4",
};
// initialization of crowdin client
const { projectsGroupsApi, sourceFilesApi, translationsApi, } = new crowdin_api_client_1.default(credentials);
/**
 * Uses the API lookup to find the project ID of the starship project
 *
 * @returns The API Project ID of the starship project (potentially the first one
 * found, if there are multiple matching projects).
 */
function getStarshipProjectID() {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield projectsGroupsApi.withFetchAll().listProjects().catch(e => console.error(e));
        if (projects === undefined) {
            console.error("Could not load project list to find starship project ID");
            throw new Error("No projects found");
        }
        console.log(projects.data);
        const targets = projects.data.filter((project) => {
            return project.data.name === "Starship Prompt" || project.data.identifier.includes("starship");
        });
        if (targets.length === 0) {
            console.error("No starship project found");
            throw new Error("No starship project found");
        }
        if (targets.length > 1) {
            console.warn("Multiple starship projects found--returning the first.");
        }
        return targets[0].data.id;
    });
}
function getProjectFileIDs(projectID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield sourceFilesApi.listProjectFiles(projectID);
            return response.data.map((file) => {
                return file.data.id;
            });
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
function getProjectLanguageIDs(projectID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield projectsGroupsApi.getProject(projectID);
            return response.data.targetLanguageIds;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
function preTranslationTMFromData(projectID, langIDs, fileIDs) {
    return __awaiter(this, void 0, void 0, function* () {
        let x = "tm"; // Translational memory
        let request = {
            languageIds: langIDs,
            fileIds: fileIDs,
            method: x,
        };
        console.log(request.languageIds);
        const res = yield translationsApi.applyPreTranslation(projectID, request);
        console.log("Finished pre-translation!");
        console.log(res);
        return res;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const starshipProjectID = yield getStarshipProjectID();
        const fIDs = yield getProjectFileIDs(starshipProjectID);
        const lIDs = yield getProjectLanguageIDs(starshipProjectID);
        const result = yield preTranslationTMFromData(starshipProjectID, lIDs, fIDs);
        console.log("Finished!");
        console.log(result);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = yield run();
        // console.log(text);
    }
    catch (e) {
        console.error("An error occurred at the top level.");
        console.error(e);
    }
    // `text` is not available here
}))();
