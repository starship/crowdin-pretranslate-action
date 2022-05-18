"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const crowdin_api_client_1 = __importDefault(require("@crowdin/crowdin-api-client"));
// Initialize Crowdin Client with API key from secrets
const credentials = {
    token: core.getInput("api_key"),
};
const { projectsGroupsApi, sourceFilesApi, translationsApi, } = new crowdin_api_client_1.default(credentials);
function getProjectFileIDs(projectID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield sourceFilesApi.listProjectFiles(projectID);
            return response.data.map((file) => {
                return file.data.id;
            });
        }
        catch (error) {
            core.error("Could not get project file IDs.");
            throw (error);
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
            core.error("Could not get project language IDs");
            throw (error);
        }
    });
}
function preTranslationTMFromData(projectID, langIDs, fileIDs) {
    return __awaiter(this, void 0, void 0, function* () {
        const x = "tm"; // Translational memory
        const request = {
            languageIds: langIDs,
            fileIds: fileIDs,
            method: x,
        };
        core.info("Requesting translations for the following languages:" + langIDs.toString());
        const res = yield translationsApi.applyPreTranslation(projectID, request);
        return res;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const projectID = parseInt(core.getInput("project_id"));
        const fIDs = yield getProjectFileIDs(projectID);
        const lIDs = yield getProjectLanguageIDs(projectID);
        const result = yield preTranslationTMFromData(projectID, lIDs, fIDs);
        return result;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const out = yield run();
        core.info("Success! The information for the pre-translation TM run is: ");
        let string_rep = JSON.stringify(out, null, 2);
        core.info(string_rep);
    }
    catch (e) {
        let string_rep = JSON.stringify(e, null, 2);
        core.setFailed(string_rep);
    }
    // `text` is not available here
}))();
