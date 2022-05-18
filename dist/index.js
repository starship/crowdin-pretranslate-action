require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9496:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
const crowdin_api_client_1 = __importDefault(__nccwpck_require__(4296));
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


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(8041);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(1327);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(1327);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 8041:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(9925);
const auth_1 = __nccwpck_require__(3702);
const core_1 = __nccwpck_require__(2186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 1327:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(2037);
const fs_1 = __nccwpck_require__(7147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 9925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(3685);
const https = __nccwpck_require__(5687);
const pm = __nccwpck_require__(6443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(4294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 6443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 4275:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isOptionalNumber = exports.isOptionalString = exports.CrowdinApi = exports.CrowdinValidationError = exports.CrowdinError = exports.BooleanInt = void 0;
const axiosProvider_1 = __nccwpck_require__(5937);
const fetchClient_1 = __nccwpck_require__(2385);
const retry_1 = __nccwpck_require__(4138);
var BooleanInt;
(function (BooleanInt) {
    BooleanInt[BooleanInt["TRUE"] = 1] = "TRUE";
    BooleanInt[BooleanInt["FALSE"] = 0] = "FALSE";
})(BooleanInt = exports.BooleanInt || (exports.BooleanInt = {}));
class CrowdinError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.CrowdinError = CrowdinError;
class CrowdinValidationError extends CrowdinError {
    constructor(messsage, validationCodes) {
        super(messsage, 400);
        this.validationCodes = validationCodes;
    }
}
exports.CrowdinValidationError = CrowdinValidationError;
function handleError(error = {}) {
    var _a, _b;
    if (Array.isArray(error.errors)) {
        const validationCodes = [];
        const validationMessages = [];
        error.errors.forEach((e) => {
            var _a;
            if (Array.isArray((_a = e.error) === null || _a === void 0 ? void 0 : _a.errors)) {
                e.error.errors.forEach((er) => {
                    if (er.message && er.code) {
                        validationCodes.push(er.code);
                        validationMessages.push(er.message);
                    }
                });
            }
        });
        const message = validationMessages.length === 0 ? 'Validation error' : validationMessages.join(', ');
        throw new CrowdinValidationError(message, validationCodes);
    }
    const message = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Error occured';
    const code = ((_b = error.error) === null || _b === void 0 ? void 0 : _b.code) || 500;
    throw new CrowdinError(message, code);
}
class CrowdinApi {
    /**
     * @param credentials credentials
     * @param config optional configuration of the client
     */
    constructor(credentials, config) {
        this.fetchAllFlag = false;
        this.token = credentials.token;
        this.organization = credentials.organization;
        if (credentials.baseUrl) {
            this.url = credentials.baseUrl;
        }
        else {
            if (this.organization) {
                this.url = `https://${this.organization}.${CrowdinApi.CROWDIN_URL_SUFFIX}`;
            }
            else {
                this.url = `https://${CrowdinApi.CROWDIN_URL_SUFFIX}`;
            }
        }
        let retryConfig;
        if (config === null || config === void 0 ? void 0 : config.retryConfig) {
            retryConfig = config.retryConfig;
        }
        else {
            retryConfig = {
                waitInterval: 0,
                retries: 0,
                conditions: [],
            };
        }
        this.retryService = new retry_1.RetryService(retryConfig);
        this.config = config;
    }
    addQueryParam(url, name, value) {
        if (value) {
            url += new RegExp(/\?.+=.*/g).test(url) ? '&' : '?';
            url += `${name}=${value}`;
        }
        return url;
    }
    defaultConfig() {
        var _a, _b;
        const config = {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        };
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.userAgent) {
            config.headers['User-Agent'] = this.config.userAgent;
        }
        if ((_b = this.config) === null || _b === void 0 ? void 0 : _b.integrationUserAgent) {
            config.headers['X-Crowdin-Integrations-User-Agent'] = this.config.integrationUserAgent;
        }
        return config;
    }
    get httpClient() {
        var _a, _b;
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.httpClient) {
            return this.config.httpClient;
        }
        if ((_b = this.config) === null || _b === void 0 ? void 0 : _b.httpClientType) {
            switch (this.config.httpClientType) {
                case 'axios':
                    return CrowdinApi.AXIOS_INSTANCE;
                case 'fetch':
                    return CrowdinApi.FETCH_INSTANCE;
                default:
                    return CrowdinApi.AXIOS_INSTANCE;
            }
        }
        return CrowdinApi.AXIOS_INSTANCE;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    withFetchAll(maxLimit) {
        this.fetchAllFlag = true;
        this.maxLimit = maxLimit;
        return this;
    }
    async getList(url, limit, offset, config) {
        const conf = config !== null && config !== void 0 ? config : this.defaultConfig();
        if (this.fetchAllFlag) {
            this.fetchAllFlag = false;
            const maxAmount = this.maxLimit;
            this.maxLimit = undefined;
            return await this.fetchAll(url, conf, maxAmount);
        }
        else {
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.get(url, conf);
        }
    }
    async fetchAll(url, config, maxAmount) {
        let limit = 500;
        if (maxAmount && maxAmount < limit) {
            limit = maxAmount;
        }
        let offset = 0;
        let resp;
        for (;;) {
            let urlWithPagination = this.addQueryParam(url, 'limit', limit);
            urlWithPagination = this.addQueryParam(urlWithPagination, 'offset', offset);
            const e = await this.get(urlWithPagination, config);
            if (!resp) {
                resp = e;
            }
            else {
                resp.data = resp.data.concat(e.data);
                resp.pagination.limit += e.data.length;
            }
            if (e.data.length < limit || (maxAmount && resp.data.length >= maxAmount)) {
                break;
            }
            else {
                offset += limit;
            }
            if (maxAmount && maxAmount < resp.data.length + limit) {
                limit = maxAmount - resp.data.length;
            }
        }
        return resp;
    }
    //Http overrides
    get(url, config) {
        return this.retryService.executeAsyncFunc(() => this.httpClient.get(url, config).catch(e => handleError(e)));
    }
    delete(url, config) {
        return this.retryService.executeAsyncFunc(() => this.httpClient.delete(url, config).catch(e => handleError(e)));
    }
    head(url, config) {
        return this.retryService.executeAsyncFunc(() => this.httpClient.head(url, config).catch(e => handleError(e)));
    }
    post(url, data, config) {
        return this.retryService.executeAsyncFunc(() => this.httpClient.post(url, data, config).catch(e => handleError(e)));
    }
    put(url, data, config) {
        return this.retryService.executeAsyncFunc(() => this.httpClient.put(url, data, config).catch(e => handleError(e)));
    }
    patch(url, data, config) {
        return this.retryService.executeAsyncFunc(() => this.httpClient.patch(url, data, config).catch(e => handleError(e)));
    }
}
exports.CrowdinApi = CrowdinApi;
CrowdinApi.CROWDIN_URL_SUFFIX = 'api.crowdin.com/api/v2';
CrowdinApi.AXIOS_INSTANCE = new axiosProvider_1.AxiosProvider().axios;
CrowdinApi.FETCH_INSTANCE = new fetchClient_1.FetchClient();
let deprecationEmittedForOptionalParams = false;
function emitDeprecationWarning() {
    if (!deprecationEmittedForOptionalParams) {
        if (typeof process !== 'undefined' && typeof process.emitWarning === 'function') {
            process.emitWarning('Passing optional parameters individually is deprecated. Pass a sole object instead', 'DeprecationWarning');
        }
        else {
            console.warn('DeprecationWarning: Passing optional parameters individually is deprecated. Pass a sole object instead');
        }
        deprecationEmittedForOptionalParams = true;
    }
}
function isOptionalString(parameter, parameterInArgs) {
    if (typeof parameter === 'string' || typeof parameter === 'undefined') {
        if (parameterInArgs) {
            emitDeprecationWarning();
        }
        return true;
    }
    else {
        return false;
    }
}
exports.isOptionalString = isOptionalString;
function isOptionalNumber(parameter, parameterInArgs) {
    if (typeof parameter === 'number' || typeof parameter === 'undefined') {
        if (parameterInArgs) {
            emitDeprecationWarning();
        }
        return true;
    }
    else {
        return false;
    }
}
exports.isOptionalNumber = isOptionalNumber;


/***/ }),

/***/ 5937:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AxiosProvider = void 0;
const axios_1 = __nccwpck_require__(6545);
class AxiosProvider {
    constructor() {
        this.pendingRequests = 0;
        this.axios = axios_1.default.create({});
        this.configureRequest();
        this.configureResponse();
    }
    configureRequest() {
        this.axios.interceptors.request.use(config => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    if (this.pendingRequests < AxiosProvider.CROWDIN_API_MAX_CONCURRENT_REQUESTS) {
                        this.pendingRequests++;
                        clearInterval(interval);
                        resolve(config);
                    }
                }, AxiosProvider.CROWDIN_API_REQUESTS_INTERVAL_MS);
            });
        });
    }
    configureResponse() {
        this.axios.interceptors.response.use(response => {
            this.pendingRequests = Math.max(0, this.pendingRequests - 1);
            return Promise.resolve(response.data);
        }, error => {
            this.pendingRequests = Math.max(0, this.pendingRequests - 1);
            return Promise.reject(error.response.data);
        });
    }
}
exports.AxiosProvider = AxiosProvider;
AxiosProvider.CROWDIN_API_MAX_CONCURRENT_REQUESTS = 15;
AxiosProvider.CROWDIN_API_REQUESTS_INTERVAL_MS = 10;


/***/ }),

/***/ 2385:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FetchClient = void 0;
class FetchClient {
    constructor() {
        this.maxConcurrentRequests = 15;
        this.requestIntervalMs = 10;
        this.pendingRequests = 0;
    }
    get(url, config) {
        return this.request(url, 'GET', config);
    }
    delete(url, config) {
        return this.request(url, 'DELETE', config);
    }
    head(url, config) {
        return this.request(url, 'HEAD', config);
    }
    post(url, data, config) {
        return this.request(url, 'POST', config, data);
    }
    put(url, data, config) {
        return this.request(url, 'PUT', config, data);
    }
    patch(url, data, config) {
        return this.request(url, 'PATCH', config, data);
    }
    async request(url, method, config, data) {
        var _a;
        let body;
        if (data) {
            if (typeof data === 'object' && !this.isBuffer(data)) {
                body = JSON.stringify(data);
                config = config !== null && config !== void 0 ? config : { headers: {} };
                config.headers = (_a = config.headers) !== null && _a !== void 0 ? _a : {};
                config.headers['Content-Type'] = 'application/json';
            }
            else {
                body = data;
            }
        }
        await this.waitInQueue();
        return fetch(url, {
            method: method,
            headers: config ? config.headers : {},
            body: body,
        })
            .then(async (res) => {
            if (res.status === 204) {
                return {};
            }
            const text = await res.text();
            const json = text ? JSON.parse(text) : {};
            if (res.status >= 200 && res.status < 300) {
                return json;
            }
            else {
                throw json;
            }
        })
            .finally(() => (this.pendingRequests = Math.max(0, this.pendingRequests - 1)));
    }
    isBuffer(data) {
        if (typeof ArrayBuffer === 'function') {
            return ArrayBuffer.isView(data);
        }
        else if (typeof Buffer === 'function') {
            return Buffer.isBuffer(data);
        }
        else {
            return false;
        }
    }
    waitInQueue() {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (this.pendingRequests < this.maxConcurrentRequests) {
                    this.pendingRequests++;
                    clearInterval(interval);
                    resolve();
                }
            }, this.requestIntervalMs);
        });
    }
}
exports.FetchClient = FetchClient;


/***/ }),

/***/ 4138:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RetryService = void 0;
class RetryService {
    constructor(config) {
        this.config = config;
    }
    /**
     * @param func function to execute
     */
    async executeAsyncFunc(func) {
        for (let i = 0; i <= this.config.retries; i++) {
            try {
                const result = await func();
                return result;
            }
            catch (error) {
                const skip = this.config.conditions.map(condition => condition.test(error)).find(skip => skip === true);
                if (skip || i === this.config.retries) {
                    throw error;
                }
                await this.wait();
            }
        }
        throw new Error('Wrong retry configuration. Failed to retrieve value.');
    }
    /**
     * @param func function to execute
     */
    async executeSyncFunc(func) {
        for (let i = 0; i <= this.config.retries; i++) {
            try {
                const result = func();
                return result;
            }
            catch (error) {
                const skip = this.config.conditions.map(condition => condition.test(error)).find(skip => skip === true);
                if (skip || i === this.config.retries) {
                    throw error;
                }
                await this.wait();
            }
        }
        throw new Error('Wrong retry configuration. Failed to retrieve value.');
    }
    wait() {
        return new Promise((res) => {
            setTimeout(() => res(), this.config.waitInterval);
        });
    }
}
exports.RetryService = RetryService;


/***/ }),

/***/ 8252:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dictionaries = void 0;
const core_1 = __nccwpck_require__(4275);
class Dictionaries extends core_1.CrowdinApi {
    listDictionaries(projectId, options) {
        if ((0, core_1.isOptionalString)(options, '1' in arguments)) {
            options = { languageIds: options };
        }
        let url = `${this.url}/projects/${projectId}/dictionaries`;
        url = this.addQueryParam(url, 'languageIds', options.languageIds);
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.dictionaries.patch
     */
    editDictionary(projectId, languageId, request) {
        const url = `${this.url}/projects/${projectId}/dictionaries/${languageId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.Dictionaries = Dictionaries;


/***/ }),

/***/ 3146:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Distributions = void 0;
const core_1 = __nccwpck_require__(4275);
class Distributions extends core_1.CrowdinApi {
    listDistributions(projectId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/distributions`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.distributions.post
     */
    createDistribution(projectId, request) {
        const url = `${this.url}/projects/${projectId}/distributions`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param hash hash
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.distributions.get
     */
    getDistribution(projectId, hash) {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param hash hash
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.distributions.delete
     */
    deleteDistribution(projectId, hash) {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param hash hash
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.distributions.patch
     */
    editDistribution(projectId, hash, request) {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.patch(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param hash hash
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.distributions.release.get
     */
    getDistributionRelease(projectId, hash) {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}/release`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param hash hash
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.distributions.release.post
     */
    createDistributionRelease(projectId, hash) {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}/release`;
        return this.post(url, {}, this.defaultConfig());
    }
}
exports.Distributions = Distributions;


/***/ }),

/***/ 510:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Glossaries = void 0;
const core_1 = __nccwpck_require__(4275);
class Glossaries extends core_1.CrowdinApi {
    listGlossaries(options, deprecatedLimit, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/glossaries`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.post
     */
    addGlossary(request) {
        const url = `${this.url}/glossaries`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.get
     */
    getGlossary(glossaryId) {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.delete
     */
    deleteGlossary(glossaryId) {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.patch
     */
    editGlossary(glossaryId, request) {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.exports.post
     */
    exportGlossary(glossaryId, request) {
        const url = `${this.url}/glossaries/${glossaryId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param exportId export identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.exports.get
     */
    checkGlossaryExportStatus(glossaryId, exportId) {
        const url = `${this.url}/glossaries/${glossaryId}/exports/${exportId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param exportId export identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.exports.download.download
     */
    downloadGlossary(glossaryId, exportId) {
        const url = `${this.url}/glossaries/${glossaryId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.imports.post
     */
    importGlossaryFile(glossaryId, request) {
        const url = `${this.url}/glossaries/${glossaryId}/imports`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param importId import identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.imports.get
     */
    checkGlossaryImportStatus(glossaryId, importId) {
        const url = `${this.url}/glossaries/${glossaryId}/imports/${importId}`;
        return this.get(url, this.defaultConfig());
    }
    listTerms(glossaryId, options, deprecatedLimit, deprecatedOffset, deprecatedLanguageId, deprecatedTranslationOfTermId) {
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                userId: options,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                languageId: deprecatedLanguageId,
                translationOfTermId: deprecatedTranslationOfTermId,
            };
        }
        url = this.addQueryParam(url, 'userId', options.userId);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationOfTermId', options.translationOfTermId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.post
     */
    addTerm(glossaryId, request) {
        const url = `${this.url}/glossaries/${glossaryId}/terms`;
        return this.post(url, request, this.defaultConfig());
    }
    clearGlossary(glossaryId, options, deprecatedTranslationOfTermId) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { languageId: options, translationOfTermId: deprecatedTranslationOfTermId };
        }
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationOfTermId', options.translationOfTermId);
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.get
     */
    getTerm(glossaryId, termId) {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.delete
     */
    deleteTerm(glossaryId, termId) {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.patch
     */
    editTerm(glossaryId, termId, request) {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.Glossaries = Glossaries;


/***/ }),

/***/ 4296:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dictionaries_1 = __nccwpck_require__(8252);
const distributions_1 = __nccwpck_require__(3146);
const glossaries_1 = __nccwpck_require__(510);
const issues_1 = __nccwpck_require__(4600);
const labels_1 = __nccwpck_require__(8203);
const languages_1 = __nccwpck_require__(1560);
const machineTranslation_1 = __nccwpck_require__(9262);
const projectsGroups_1 = __nccwpck_require__(2305);
const reports_1 = __nccwpck_require__(3828);
const screenshots_1 = __nccwpck_require__(9236);
const sourceFiles_1 = __nccwpck_require__(4547);
const sourceStrings_1 = __nccwpck_require__(4514);
const stringComments_1 = __nccwpck_require__(1415);
const stringTranslations_1 = __nccwpck_require__(7301);
const tasks_1 = __nccwpck_require__(2207);
const teams_1 = __nccwpck_require__(9602);
const translationMemory_1 = __nccwpck_require__(8376);
const translations_1 = __nccwpck_require__(8281);
const translationStatus_1 = __nccwpck_require__(9084);
const uploadStorage_1 = __nccwpck_require__(4351);
const users_1 = __nccwpck_require__(8865);
const vendors_1 = __nccwpck_require__(5770);
const webhooks_1 = __nccwpck_require__(919);
const workflows_1 = __nccwpck_require__(6184);
__exportStar(__nccwpck_require__(4275), exports);
__exportStar(__nccwpck_require__(8252), exports);
__exportStar(__nccwpck_require__(3146), exports);
__exportStar(__nccwpck_require__(510), exports);
__exportStar(__nccwpck_require__(4600), exports);
__exportStar(__nccwpck_require__(8203), exports);
__exportStar(__nccwpck_require__(1560), exports);
__exportStar(__nccwpck_require__(9262), exports);
__exportStar(__nccwpck_require__(2305), exports);
__exportStar(__nccwpck_require__(3828), exports);
__exportStar(__nccwpck_require__(9236), exports);
__exportStar(__nccwpck_require__(4547), exports);
__exportStar(__nccwpck_require__(4514), exports);
__exportStar(__nccwpck_require__(1415), exports);
__exportStar(__nccwpck_require__(7301), exports);
__exportStar(__nccwpck_require__(2207), exports);
__exportStar(__nccwpck_require__(9602), exports);
__exportStar(__nccwpck_require__(8376), exports);
__exportStar(__nccwpck_require__(8281), exports);
__exportStar(__nccwpck_require__(9084), exports);
__exportStar(__nccwpck_require__(4351), exports);
__exportStar(__nccwpck_require__(8865), exports);
__exportStar(__nccwpck_require__(5770), exports);
__exportStar(__nccwpck_require__(919), exports);
__exportStar(__nccwpck_require__(6184), exports);
class Client {
    constructor(credentials, config) {
        this.sourceFilesApi = new sourceFiles_1.SourceFiles(credentials, config);
        this.glossariesApi = new glossaries_1.Glossaries(credentials, config);
        this.languagesApi = new languages_1.Languages(credentials, config);
        this.translationsApi = new translations_1.Translations(credentials, config);
        this.translationStatusApi = new translationStatus_1.TranslationStatus(credentials, config);
        this.projectsGroupsApi = new projectsGroups_1.ProjectsGroups(credentials, config);
        this.reportsApi = new reports_1.Reports(credentials, config);
        this.screenshotsApi = new screenshots_1.Screenshots(credentials, config);
        this.sourceStringsApi = new sourceStrings_1.SourceStrings(credentials, config);
        this.uploadStorageApi = new uploadStorage_1.UploadStorage(credentials, config);
        this.tasksApi = new tasks_1.Tasks(credentials, config);
        this.translationMemoryApi = new translationMemory_1.TranslationMemory(credentials, config);
        this.webhooksApi = new webhooks_1.Webhooks(credentials, config);
        this.machineTranslationApi = new machineTranslation_1.MachineTranslation(credentials, config);
        this.stringTranslationsApi = new stringTranslations_1.StringTranslations(credentials, config);
        this.workflowsApi = new workflows_1.Workflows(credentials, config);
        this.usersApi = new users_1.Users(credentials, config);
        this.vendorsApi = new vendors_1.Vendors(credentials, config);
        this.issuesApi = new issues_1.Issues(credentials, config);
        this.teamsApi = new teams_1.Teams(credentials, config);
        this.distributionsApi = new distributions_1.Distributions(credentials, config);
        this.dictionariesApi = new dictionaries_1.Dictionaries(credentials, config);
        this.labelsApi = new labels_1.Labels(credentials, config);
        this.stringCommentsApi = new stringComments_1.StringComments(credentials, config);
    }
}
exports["default"] = Client;


/***/ }),

/***/ 4600:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Issues = void 0;
const core_1 = __nccwpck_require__(4275);
/**
 * @deprecated
 */
class Issues extends core_1.CrowdinApi {
    listReportedIssues(projectId, options, deprecatedOffset, deprecatedType, deprecatedStatus) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedOffset,
                type: deprecatedType,
                status: deprecatedStatus,
            };
        }
        let url = `${this.url}/projects/${projectId}/issues`;
        url = this.addQueryParam(url, 'type', options.type);
        url = this.addQueryParam(url, 'status', options.status);
        return this.getList(url, options.limit, deprecatedOffset);
    }
    /**
     * @param projectId project identifier
     * @param issueId issue identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.issues.patch
     */
    editIssue(projectId, issueId, request) {
        const url = `${this.url}/projects/${projectId}/issues/${issueId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.Issues = Issues;


/***/ }),

/***/ 8203:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Labels = void 0;
const core_1 = __nccwpck_require__(4275);
class Labels extends core_1.CrowdinApi {
    listLabels(projectId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/labels`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.post
     */
    addLabel(projectId, request) {
        const url = `${this.url}/projects/${projectId}/labels`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.get
     */
    getLabel(projectId, labelId) {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.delete
     */
    deleteLabel(projectId, labelId) {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.patch
     */
    editLabel(projectId, labelId, request) {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.strings.post
     */
    assignLabelToString(projectId, labelId, request) {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}/strings`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param stringIds string identifiers
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.strings.deleteMany
     */
    unassignLabelFromString(projectId, labelId, stringIds) {
        let url = `${this.url}/projects/${projectId}/labels/${labelId}/strings`;
        url = this.addQueryParam(url, 'stringIds', stringIds);
        return this.delete(url, this.defaultConfig());
    }
}
exports.Labels = Labels;


/***/ }),

/***/ 1560:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Languages = void 0;
const core_1 = __nccwpck_require__(4275);
class Languages extends core_1.CrowdinApi {
    listSupportedLanguages(options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/languages`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.post
     */
    addCustomLanguage(request) {
        const url = `${this.url}/languages`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param languageId language identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.get
     */
    getLanguage(languageId) {
        const url = `${this.url}/languages/${languageId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param languageId language identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.delete
     */
    deleteCustomLanguage(languageId) {
        const url = `${this.url}/languages/${languageId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param languageId language identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.patch
     */
    editCustomLanguage(languageId, request) {
        const url = `${this.url}/languages/${languageId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.Languages = Languages;


/***/ }),

/***/ 9262:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MachineTranslation = void 0;
const core_1 = __nccwpck_require__(4275);
class MachineTranslation extends core_1.CrowdinApi {
    listMts(options, deprecatedLimit, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/mts`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.mts.post
     */
    createMt(request) {
        const url = `${this.url}/mts`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param mtId mt identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.mts.getMany
     */
    getMt(mtId) {
        const url = `${this.url}/mts/${mtId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param mtId mt identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.mts.delete
     */
    deleteMt(mtId) {
        const url = `${this.url}/mts/${mtId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param mtId mt identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.mts.patch
     */
    updateMt(mtId, request) {
        const url = `${this.url}/mts/${mtId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    /**
     * @param mtId mt identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.mts.translations.post
     */
    translate(mtId, request) {
        const url = `${this.url}/mts/${mtId}/translations`;
        return this.post(url, request, this.defaultConfig());
    }
}
exports.MachineTranslation = MachineTranslation;


/***/ }),

/***/ 2305:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectsGroupsModel = exports.ProjectsGroups = void 0;
const core_1 = __nccwpck_require__(4275);
class ProjectsGroups extends core_1.CrowdinApi {
    listGroups(options, deprecatedOffset, deprecatedUserId, deprecatedLimit) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = {
                parentId: options,
                offset: deprecatedOffset,
                userId: deprecatedUserId,
                limit: deprecatedLimit,
            };
        }
        let url = `${this.url}/groups`;
        url = this.addQueryParam(url, 'parentId', options.parentId);
        url = this.addQueryParam(url, 'userId', options.userId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.post
     */
    addGroup(request) {
        const url = `${this.url}/groups`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param group group identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.get
     */
    getGroup(groupId) {
        const url = `${this.url}/groups/${groupId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param groupId group identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.delete
     */
    deleteGroup(groupId) {
        const url = `${this.url}/groups/${groupId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param groupId group identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.patch
     */
    editGroup(groupId, request) {
        const url = `${this.url}/groups/${groupId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    listProjects(options, deprecatedHasManagerAccess, deprecatedLimit, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = {
                groupId: options,
                hasManagerAccess: deprecatedHasManagerAccess,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
        }
        let url = `${this.url}/projects`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        url = this.addQueryParam(url, 'hasManagerAccess', options.hasManagerAccess);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.post
     */
    addProject(request) {
        const url = `${this.url}/projects`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.get
     */
    getProject(projectId) {
        const url = `${this.url}/projects/${projectId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.delete
     */
    deleteProject(projectId) {
        const url = `${this.url}/projects/${projectId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.patch
     */
    editProject(projectId, request) {
        const url = `${this.url}/projects/${projectId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.ProjectsGroups = ProjectsGroups;
var ProjectsGroupsModel;
(function (ProjectsGroupsModel) {
    let Type;
    (function (Type) {
        Type[Type["FILES_BASED"] = 0] = "FILES_BASED";
        Type[Type["STRINGS_BASED"] = 1] = "STRINGS_BASED";
    })(Type = ProjectsGroupsModel.Type || (ProjectsGroupsModel.Type = {}));
    let TranslateDuplicates;
    (function (TranslateDuplicates) {
        TranslateDuplicates[TranslateDuplicates["SHOW"] = 0] = "SHOW";
        TranslateDuplicates[TranslateDuplicates["HIDE_REGULAR_DETECTION"] = 1] = "HIDE_REGULAR_DETECTION";
        TranslateDuplicates[TranslateDuplicates["SHOW_AUTO_TRANSLATE"] = 2] = "SHOW_AUTO_TRANSLATE";
        TranslateDuplicates[TranslateDuplicates["SHOW_WITHIN_VERION_BRANCH_REGULAR_DETECTION"] = 3] = "SHOW_WITHIN_VERION_BRANCH_REGULAR_DETECTION";
        TranslateDuplicates[TranslateDuplicates["HIDE_STRICT_DETECTION"] = 4] = "HIDE_STRICT_DETECTION";
        TranslateDuplicates[TranslateDuplicates["SHOW_WITHIN_VERION_BRANCH_STRICT_DETECTION"] = 5] = "SHOW_WITHIN_VERION_BRANCH_STRICT_DETECTION";
    })(TranslateDuplicates = ProjectsGroupsModel.TranslateDuplicates || (ProjectsGroupsModel.TranslateDuplicates = {}));
})(ProjectsGroupsModel = exports.ProjectsGroupsModel || (exports.ProjectsGroupsModel = {}));


/***/ }),

/***/ 3828:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Reports = void 0;
const core_1 = __nccwpck_require__(4275);
class Reports extends core_1.CrowdinApi {
    /**
     * @param groupId group identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.reports.post
     */
    generateGroupReport(groupId, request) {
        const url = `${this.url}/groups/${groupId}/reports`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param groupId group identifier
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.reports.get
     */
    checkGroupReportStatus(groupId, reportId) {
        const url = `${this.url}/groups/${groupId}/reports/${reportId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param groupId group identifier
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.reports.download.download
     */
    downloadGroupReport(groupId, reportId) {
        const url = `${this.url}/groups/${groupId}/reports/${reportId}/download`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.reports.post
     */
    generateOrganizationReport(request) {
        const url = `${this.url}/reports`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.reports.get
     */
    checkOrganizationReportStatus(reportId) {
        const url = `${this.url}/reports/${reportId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.reports.download.download
     */
    downloadOrganizationReport(reportId) {
        const url = `${this.url}/reports/${reportId}/download`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.reports.post
     */
    generateReport(projectId, request) {
        const url = `${this.url}/projects/${projectId}/reports`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param reportId report identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.reports.get
     */
    checkReportStatus(projectId, reportId) {
        const url = `${this.url}/projects/${projectId}/reports/${reportId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param reportId report identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.reports.download.download
     */
    downloadReport(projectId, reportId) {
        const url = `${this.url}/projects/${projectId}/reports/${reportId}/download`;
        return this.get(url, this.defaultConfig());
    }
}
exports.Reports = Reports;


/***/ }),

/***/ 9236:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Screenshots = void 0;
const core_1 = __nccwpck_require__(4275);
class Screenshots extends core_1.CrowdinApi {
    listScreenshots(projectId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/screenshots`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.post
     */
    addScreenshot(projectId, request) {
        const url = `${this.url}/projects/${projectId}/screenshots`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.get
     */
    getScreenshot(projectId, screenshotId) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.put
     */
    updateScreenshot(projectId, screenshotId, request) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.put(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.delete
     */
    deleteScreenshot(projectId, screenshotId) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.patch
     */
    editScreenshot(projectId, screenshotId, request) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    listScreenshotTags(projectId, screenshotId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.putMany
     */
    replaceTags(projectId, screenshotId, request) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.put(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.post
     */
    addTag(projectId, screenshotId, request) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.deleteMany
     */
    clearTags(projectId, screenshotId) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param tagId tag identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.get
     */
    getTag(projectId, screenshotId, tagId) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param tagId tag identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.delete
     */
    deleteTag(projectId, screenshotId, tagId) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param tagId tag identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.patch
     */
    updateTag(projectId, screenshotId, tagId, request) {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.Screenshots = Screenshots;


/***/ }),

/***/ 4547:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceFilesModel = exports.SourceFiles = void 0;
const core_1 = __nccwpck_require__(4275);
class SourceFiles extends core_1.CrowdinApi {
    listProjectBranches(projectId, options, deprecatedLimit, deprecatedOffset) {
        if ((0, core_1.isOptionalString)(options, '1' in arguments)) {
            options = { name: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/projects/${projectId}/branches`;
        url = this.addQueryParam(url, 'name', options.name);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.branches.post
     */
    createBranch(projectId, request) {
        const url = `${this.url}/projects/${projectId}/branches`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.branches.get
     */
    getBranch(projectId, branchId) {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.branches.delete
     */
    deleteBranch(projectId, branchId) {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.branches.patch
     */
    editBranch(projectId, branchId, request) {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    listProjectDirectories(projectId, options, deprecatedDirectoryId, deprecatedLimit, deprecatedOffset, deprecatedFilter, deprecatedRecursion) {
        let url = `${this.url}/projects/${projectId}/directories`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                branchId: options,
                directoryId: deprecatedDirectoryId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                recursion: deprecatedRecursion,
                filter: deprecatedFilter,
            };
        }
        url = this.addQueryParam(url, 'branchId', options.branchId);
        url = this.addQueryParam(url, 'directoryId', options.directoryId);
        url = this.addQueryParam(url, 'filter', options.filter);
        url = this.addQueryParam(url, 'recursion', options.recursion);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.directories.post
     */
    createDirectory(projectId, request) {
        const url = `${this.url}/projects/${projectId}/directories`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.directories.get
     */
    getDirectory(projectId, directoryId) {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.directories.delete
     */
    deleteDirectory(projectId, directoryId) {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.directories.patch
     */
    editDirectory(projectId, directoryId, request) {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    listProjectFiles(projectId, options, deprecatedDirectoryId, deprecatedLimit, deprecatedOffset, deprecatedRecursion, deprecatedFilter) {
        let url = `${this.url}/projects/${projectId}/files`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                branchId: options,
                directoryId: deprecatedDirectoryId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                recursion: deprecatedRecursion,
                filter: deprecatedFilter,
            };
        }
        url = this.addQueryParam(url, 'branchId', options.branchId);
        url = this.addQueryParam(url, 'directoryId', options.directoryId);
        url = this.addQueryParam(url, 'recursion', options.recursion);
        url = this.addQueryParam(url, 'filter', options.filter);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.post
     */
    createFile(projectId, request) {
        const url = `${this.url}/projects/${projectId}/files`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.get
     */
    getFile(projectId, fileId) {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.put
     */
    updateOrRestoreFile(projectId, fileId, request) {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.put(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.delete
     */
    deleteFile(projectId, fileId) {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.patch
     */
    editFile(projectId, fileId, request) {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.download.get
     */
    downloadFile(projectId, fileId) {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/download`;
        return this.get(url, this.defaultConfig());
    }
    listFileRevisions(projectId, fileId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param revisionId revision identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.revisions.get
     */
    getFileRevision(projectId, fileId, revisionId) {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions/${revisionId}`;
        return this.get(url, this.defaultConfig());
    }
    listReviewedSourceFilesBuild(projectId, options, deprecatedLimit, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { branchId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/projects/${projectId}/strings/reviewed-builds`;
        url = this.addQueryParam(url, 'branchId', options.branchId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.post
     */
    buildReviewedSourceFiles(projectId, request = {}) {
        const url = `${this.url}/projects/${projectId}/strings/reviewed-builds`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.get
     */
    checkReviewedSourceFilesBuildStatus(projectId, buildId) {
        const url = `${this.url}/projects/${projectId}/strings/reviewed-builds/${buildId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.download.download
     */
    downloadReviewedSourceFiles(projectId, buildId) {
        const url = `${this.url}/projects/${projectId}/strings/reviewed-builds/${buildId}/download`;
        return this.get(url, this.defaultConfig());
    }
}
exports.SourceFiles = SourceFiles;
var SourceFilesModel;
(function (SourceFilesModel) {
    let EscapeQuotes;
    (function (EscapeQuotes) {
        EscapeQuotes[EscapeQuotes["ZERO"] = 0] = "ZERO";
        EscapeQuotes[EscapeQuotes["ONE"] = 1] = "ONE";
        EscapeQuotes[EscapeQuotes["TWO"] = 2] = "TWO";
        EscapeQuotes[EscapeQuotes["THREE"] = 3] = "THREE";
    })(EscapeQuotes = SourceFilesModel.EscapeQuotes || (SourceFilesModel.EscapeQuotes = {}));
})(SourceFilesModel = exports.SourceFilesModel || (exports.SourceFilesModel = {}));


/***/ }),

/***/ 4514:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceStringsModel = exports.SourceStrings = void 0;
const core_1 = __nccwpck_require__(4275);
class SourceStrings extends core_1.CrowdinApi {
    listProjectStrings(projectId, options, deprecatedLimit, deprecatedOffset, deprecatedFilter, deprecatedDenormalizePlaceholders, deprecatedLabelIds, deprecatedScope, deprecatedCroql, deprecatedBranchId, deprecatedDirectoryId) {
        let url = `${this.url}/projects/${projectId}/strings`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                fileId: options,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                filter: deprecatedFilter,
                denormalizePlaceholders: deprecatedDenormalizePlaceholders,
                labelIds: deprecatedLabelIds,
                scope: deprecatedScope,
                croql: deprecatedCroql,
                branchId: deprecatedBranchId,
                directoryId: deprecatedDirectoryId,
            };
        }
        url = this.addQueryParam(url, 'fileId', options.fileId);
        url = this.addQueryParam(url, 'filter', options.filter);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        url = this.addQueryParam(url, 'labelIds', options.labelIds);
        url = this.addQueryParam(url, 'scope', options.scope);
        url = this.addQueryParam(url, 'croql', options.croql);
        url = this.addQueryParam(url, 'branchId', options.branchId);
        url = this.addQueryParam(url, 'directoryId', options.directoryId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.strings.post
     */
    addString(projectId, request) {
        const url = `${this.url}/projects/${projectId}/strings`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.strings.get
     */
    getString(projectId, stringId) {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.strings.delete
     */
    deleteString(projectId, stringId) {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.strings.patch
     */
    editString(projectId, stringId, request) {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.SourceStrings = SourceStrings;
var SourceStringsModel;
(function (SourceStringsModel) {
    let Type;
    (function (Type) {
        Type[Type["TEXT"] = 0] = "TEXT";
        Type[Type["ASSET"] = 1] = "ASSET";
        Type[Type["ICU"] = 2] = "ICU";
    })(Type = SourceStringsModel.Type || (SourceStringsModel.Type = {}));
})(SourceStringsModel = exports.SourceStringsModel || (exports.SourceStringsModel = {}));


/***/ }),

/***/ 1415:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringComments = void 0;
const core_1 = __nccwpck_require__(4275);
class StringComments extends core_1.CrowdinApi {
    listStringComments(projectId, options, deprecatedType, deprecatedTargetLanguageId, deprecatedIssueType, deprecatedIssueStatus) {
        let url = `${this.url}/projects/${projectId}/comments`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                stringId: options,
                type: deprecatedType,
                targetLanguageId: deprecatedTargetLanguageId,
                issueStatus: deprecatedIssueStatus,
                issueType: deprecatedIssueType,
            };
        }
        url = this.addQueryParam(url, 'stringId', options.stringId);
        url = this.addQueryParam(url, 'type', options.type);
        url = this.addQueryParam(url, 'targetLanguageId', options.targetLanguageId);
        url = this.addQueryParam(url, 'issueType', options.issueType);
        url = this.addQueryParam(url, 'issueStatus', options.issueStatus);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.post
     */
    addStringComment(projectId, request) {
        const url = `${this.url}/projects/${projectId}/comments`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param stringCommentId string comment identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.get
     */
    getStringComment(projectId, stringCommentId) {
        const url = `${this.url}/projects/${projectId}/comments/${stringCommentId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param stringCommentId string comment identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.delete
     */
    deleteStringComment(projectId, stringCommentId) {
        const url = `${this.url}/projects/${projectId}/comments/${stringCommentId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param stringCommentId string comment identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.patch
     */
    editStringComment(projectId, stringCommentId, request) {
        const url = `${this.url}/projects/${projectId}/comments/${stringCommentId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.StringComments = StringComments;


/***/ }),

/***/ 7301:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringTranslations = void 0;
const core_1 = __nccwpck_require__(4275);
class StringTranslations extends core_1.CrowdinApi {
    listTranslationApprovals(projectId, options, deprecatedLanguageId, deprecatedTranslationId, deprecatedLimit, deprecatedOffset, deprecatedFileId) {
        let url = `${this.url}/projects/${projectId}/approvals`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                stringId: options,
                languageId: deprecatedLanguageId,
                translationId: deprecatedTranslationId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                fileId: deprecatedFileId,
            };
        }
        url = this.addQueryParam(url, 'stringId', options.stringId);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationId', options.translationId);
        url = this.addQueryParam(url, 'fileId', options.fileId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.approvals.post
     */
    addApproval(projectId, request) {
        const url = `${this.url}/projects/${projectId}/approvals`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param approvalId approval identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.approvals.get
     */
    approvalInfo(projectId, approvalId) {
        const url = `${this.url}/projects/${projectId}/approvals/${approvalId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param approvalId approval identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.approvals.delete
     */
    removeApproval(projectId, approvalId) {
        const url = `${this.url}/projects/${projectId}/approvals/${approvalId}`;
        return this.delete(url, this.defaultConfig());
    }
    listLanguageTranslations(projectId, languageId, options, fileId, limit, offset, labelIds, denormalizePlaceholders, croql) {
        let url = `${this.url}/projects/${projectId}/languages/${languageId}/translations`;
        if ((0, core_1.isOptionalString)(options, '2' in arguments)) {
            options = {
                stringIds: options,
                fileId,
                limit,
                offset,
                labelIds,
                denormalizePlaceholders,
                croql,
            };
        }
        url = this.addQueryParam(url, 'stringIds', options.stringIds);
        url = this.addQueryParam(url, 'fileId', options.fileId);
        url = this.addQueryParam(url, 'labelIds', options.labelIds);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        url = this.addQueryParam(url, 'croql', options.croql);
        return this.getList(url, options.limit, options.offset);
    }
    listStringTranslations(projectId, stringId, languageId, options, deprecatedOffset, deprecatedDenormalizePlaceholders) {
        if ((0, core_1.isOptionalNumber)(options, '3' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedOffset,
                denormalizePlaceholders: deprecatedDenormalizePlaceholders,
            };
        }
        let url = `${this.url}/projects/${projectId}/translations`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.post
     */
    addTranslation(projectId, request) {
        const url = `${this.url}/projects/${projectId}/translations`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.deleteMany
     */
    deleteAllTranslations(projectId, stringId, languageId) {
        let url = `${this.url}/projects/${projectId}/translations`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param translationId translation identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.get
     */
    translationInfo(projectId, translationId) {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param translation translation identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.put
     */
    restoreTranslation(projectId, translationId) {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}/restore`;
        return this.put(url, {}, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param translation translation identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.delete
     */
    deleteTranslation(projectId, translationId) {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}`;
        return this.delete(url, this.defaultConfig());
    }
    listTranslationVotes(projectId, options, deprecatedLanguageId, deprecatedTranslationId, deprecatedLimit, deprecatedOffset) {
        let url = `${this.url}/projects/${projectId}/votes`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                stringId: options,
                languageId: deprecatedLanguageId,
                translationId: deprecatedTranslationId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
        }
        url = this.addQueryParam(url, 'stringId', options.stringId);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationId', options.translationId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.votes.post
     */
    addVote(projectId, request) {
        const url = `${this.url}/projects/${projectId}/votes`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param voteId vote identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.votes.get
     */
    voteInfo(projectId, voteId) {
        const url = `${this.url}/projects/${projectId}/votes/${voteId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param voteId vote identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.votes.delete
     */
    cancelVote(projectId, voteId) {
        const url = `${this.url}/projects/${projectId}/votes/${voteId}`;
        return this.delete(url, this.defaultConfig());
    }
}
exports.StringTranslations = StringTranslations;


/***/ }),

/***/ 2207:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksModel = exports.Tasks = void 0;
const core_1 = __nccwpck_require__(4275);
class Tasks extends core_1.CrowdinApi {
    listTasks(projectId, options, deprecatedOffset, deprecatedStatus) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset, status: deprecatedStatus };
        }
        let url = `${this.url}/projects/${projectId}/tasks`;
        url = this.addQueryParam(url, 'status', options.status);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.post
     */
    addTask(projectId, request) {
        const url = `${this.url}/projects/${projectId}/tasks`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.exports.post
     */
    exportTaskStrings(projectId, taskId) {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}/exports`;
        return this.post(url, {}, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.get
     */
    getTask(projectId, taskId) {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.delete
     */
    deleteTask(projectId, taskId) {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.patch
     */
    editTask(projectId, taskId, request) {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    listUserTasks(options, deprecatedOffset, deprecatedStatus, deprecatedIsArchived) {
        let url = `${this.url}/user/tasks`;
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedOffset,
                status: deprecatedStatus,
                isArchived: deprecatedIsArchived,
            };
        }
        url = this.addQueryParam(url, 'status', options.status);
        url = this.addQueryParam(url, 'isArchived', options.isArchived);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.user.tasks.patch
     */
    editTaskArchivedStatus(projectId, taskId, request) {
        let url = `${this.url}/user/tasks/${taskId}`;
        url = this.addQueryParam(url, 'projectId', projectId);
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.Tasks = Tasks;
var TasksModel;
(function (TasksModel) {
    let Type;
    (function (Type) {
        Type[Type["TRANSLATE"] = 0] = "TRANSLATE";
        Type[Type["PROOFREAD"] = 1] = "PROOFREAD";
        Type[Type["TRANSLATE_BY_VENDOR"] = 2] = "TRANSLATE_BY_VENDOR";
    })(Type = TasksModel.Type || (TasksModel.Type = {}));
})(TasksModel = exports.TasksModel || (exports.TasksModel = {}));


/***/ }),

/***/ 9602:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Teams = void 0;
const core_1 = __nccwpck_require__(4275);
class Teams extends core_1.CrowdinApi {
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.teams.post
     */
    addTeamToProject(projectId, request) {
        const url = `${this.url}/projects/${projectId}/teams`;
        return this.post(url, request, this.defaultConfig());
    }
    listTeams(options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/teams`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.post
     */
    addTeam(request) {
        const url = `${this.url}/teams`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param teamId team identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.get
     */
    getTeam(teamId) {
        const url = `${this.url}/teams/${teamId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param teamId team identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.delete
     */
    deleteTeam(teamId) {
        const url = `${this.url}/teams/${teamId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param teamId team identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.patch
     */
    editTeam(teamId, request) {
        const url = `${this.url}/teams/${teamId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    teamMembersList(teamId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/teams/${teamId}/members`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param teamId team identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.post
     */
    addTeamMembers(teamId, request) {
        const url = `${this.url}/teams/${teamId}/members`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param teamId team identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.deleteMany
     */
    deleteAllTeamMembers(teamId) {
        const url = `${this.url}/teams/${teamId}/members`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param teamId team identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.delete
     */
    deleteTeamMember(teamId, memberId) {
        const url = `${this.url}/teams/${teamId}/members/${memberId}`;
        return this.delete(url, this.defaultConfig());
    }
}
exports.Teams = Teams;


/***/ }),

/***/ 8376:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationMemory = void 0;
const core_1 = __nccwpck_require__(4275);
class TranslationMemory extends core_1.CrowdinApi {
    listTm(options, deprecatedLimit, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/tms`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.post
     */
    addTm(request) {
        const url = `${this.url}/tms`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.get
     */
    getTm(tmId) {
        const url = `${this.url}/tms/${tmId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.delete
     */
    deleteTm(tmId) {
        const url = `${this.url}/tms/${tmId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.patch
     */
    editTm(tmId, request) {
        const url = `${this.url}/tms/${tmId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.segments.clear
     */
    clearTm(tmId) {
        const url = `${this.url}/tms/${tmId}/segments`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.exports.post
     */
    exportTm(tmId, request = {}) {
        const url = `${this.url}/tms/${tmId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @param exportId export identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.exports.get
     */
    checkExportStatus(tmId, exportId) {
        const url = `${this.url}/tms/${tmId}/exports/${exportId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @param exportId export identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.exports.download.download
     */
    downloadTm(tmId, exportId) {
        const url = `${this.url}/tms/${tmId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.imports.post
     */
    importTm(tmId, request) {
        const url = `${this.url}/tms/${tmId}/imports`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param tmId tm identifier
     * @param importId import identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.imports.get
     */
    checkImportStatus(tmId, importId) {
        const url = `${this.url}/tms/${tmId}/imports/${importId}`;
        return this.get(url, this.defaultConfig());
    }
}
exports.TranslationMemory = TranslationMemory;


/***/ }),

/***/ 9084:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationStatus = void 0;
const core_1 = __nccwpck_require__(4275);
class TranslationStatus extends core_1.CrowdinApi {
    getBranchProgress(projectId, branchId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/branches/${branchId}/languages/progress`;
        return this.getList(url, options.limit, options.offset);
    }
    getDirectoryProgress(projectId, directoryId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}/languages/progress`;
        return this.getList(url, options.limit, options.offset);
    }
    getFileProgress(projectId, fileId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/files/${fileId}/languages/progress`;
        return this.getList(url, options.limit, options.offset);
    }
    getLanguageProgress(projectId, languageId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/languages/${languageId}/progress`;
        return this.getList(url, options.limit, options.offset);
    }
    getProjectProgress(projectId, options, deprecatedOffset, deprecatedLanguageIds) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset, languageIds: deprecatedLanguageIds };
        }
        let url = `${this.url}/projects/${projectId}/languages/progress`;
        url = this.addQueryParam(url, 'languageIds', options.languageIds);
        return this.getList(url, options.limit, options.offset);
    }
    listQaCheckIssues(projectId, options, deprecatedOffset, deprecatedCategory, deprecatedValidation, deprecatedLanguageIds) {
        let url = `${this.url}/projects/${projectId}/qa-checks`;
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedOffset,
                category: deprecatedCategory,
                validation: deprecatedValidation,
                languageIds: deprecatedLanguageIds,
            };
        }
        url = this.addQueryParam(url, 'category', options.category);
        url = this.addQueryParam(url, 'validation', options.validation);
        url = this.addQueryParam(url, 'languageIds', options.languageIds);
        return this.getList(url, options.limit, options.offset);
    }
}
exports.TranslationStatus = TranslationStatus;


/***/ }),

/***/ 8281:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Translations = void 0;
const core_1 = __nccwpck_require__(4275);
class Translations extends core_1.CrowdinApi {
    /**
     * @param projectId project identifier
     * @param preTranslationId pre translation identifier
     * @see https://support.crowdin.com/api/v2/#tag/Translations/paths/~1projects~1{projectId}~1pre-translations~1{preTranslationId}/get
     */
    preTranslationStatus(projectId, preTranslationId) {
        const url = `${this.url}/projects/${projectId}/pre-translations/${preTranslationId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.pre-translations.post
     */
    applyPreTranslation(projectId, request) {
        const url = `${this.url}/projects/${projectId}/pre-translations`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.directories.post
     */
    buildProjectDirectoryTranslation(projectId, directoryId, request = {}) {
        const url = `${this.url}/projects/${projectId}/translations/builds/directories/${directoryId}`;
        const config = this.defaultConfig();
        return this.post(url, request, config);
    }
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     * @param eTag 'If-None-Match' header
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.files.post
     */
    buildProjectFileTranslation(projectId, fileId, request, eTag) {
        const url = `${this.url}/projects/${projectId}/translations/builds/files/${fileId}`;
        const config = this.defaultConfig();
        if (eTag) {
            config.headers['If-None-Match'] = eTag;
        }
        return this.post(url, request, config);
    }
    listProjectBuilds(projectId, options, deprecatedLimit, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { branchId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/projects/${projectId}/translations/builds`;
        url = this.addQueryParam(url, 'branchId', options.branchId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.post
     */
    buildProject(projectId, request = {}) {
        const url = `${this.url}/projects/${projectId}/translations/builds`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.postOnLanguage
     */
    uploadTranslation(projectId, languageId, request) {
        const url = `${this.url}/projects/${projectId}/translations/${languageId}`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.download.download
     */
    downloadTranslations(projectId, buildId) {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}/download`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.get
     */
    checkBuildStatus(projectId, buildId) {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.delete
     */
    cancelBuild(projectId, buildId) {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.exports.post
     */
    exportProjectTranslation(projectId, request) {
        const url = `${this.url}/projects/${projectId}/translations/exports`;
        return this.post(url, request, this.defaultConfig());
    }
}
exports.Translations = Translations;


/***/ }),

/***/ 4351:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadStorage = void 0;
const core_1 = __nccwpck_require__(4275);
const mimetypes = {
    '3dml': 'text/vnd.in3d.3dml',
    '3g2': 'video/3gpp2',
    '3gp': 'video/3gpp',
    '7z': 'application/x-7z-compressed',
    aab: 'application/x-authorware-bin',
    aac: 'audio/x-aac',
    aam: 'application/x-authorware-map',
    aas: 'application/x-authorware-seg',
    abw: 'application/x-abiword',
    ac: 'application/pkix-attr-cert',
    acc: 'application/vnd.americandynamics.acc',
    ace: 'application/x-ace-compressed',
    acu: 'application/vnd.acucobol',
    acutc: 'application/vnd.acucorp',
    adp: 'audio/adpcm',
    aep: 'application/vnd.audiograph',
    afm: 'application/x-font-type1',
    afp: 'application/vnd.ibm.modcap',
    ahead: 'application/vnd.ahead.space',
    ai: 'application/postscript',
    aif: 'audio/x-aiff',
    aifc: 'audio/x-aiff',
    aiff: 'audio/x-aiff',
    air: 'application/vnd.adobe.air-application-installer-package+zip',
    ait: 'application/vnd.dvb.ait',
    ami: 'application/vnd.amiga.ami',
    apk: 'application/vnd.android.package-archive',
    application: 'application/x-ms-application',
    apr: 'application/vnd.lotus-approach',
    asa: 'text/plain',
    asax: 'application/octet-stream',
    asc: 'application/pgp-signature',
    ascx: 'text/plain',
    asf: 'video/x-ms-asf',
    ashx: 'text/plain',
    asm: 'text/x-asm',
    asmx: 'text/plain',
    aso: 'application/vnd.accpac.simply.aso',
    asp: 'text/plain',
    aspx: 'text/plain',
    asx: 'video/x-ms-asf',
    atc: 'application/vnd.acucorp',
    atom: 'application/atom+xml',
    atomcat: 'application/atomcat+xml',
    atomsvc: 'application/atomsvc+xml',
    atx: 'application/vnd.antix.game-component',
    au: 'audio/basic',
    avi: 'video/x-msvideo',
    aw: 'application/applixware',
    axd: 'text/plain',
    azf: 'application/vnd.airzip.filesecure.azf',
    azs: 'application/vnd.airzip.filesecure.azs',
    azw: 'application/vnd.amazon.ebook',
    bat: 'application/x-msdownload',
    bcpio: 'application/x-bcpio',
    bdf: 'application/x-font-bdf',
    bdm: 'application/vnd.syncml.dm+wbxml',
    bed: 'application/vnd.realvnc.bed',
    bh2: 'application/vnd.fujitsu.oasysprs',
    bin: 'application/octet-stream',
    bmi: 'application/vnd.bmi',
    bmp: 'image/bmp',
    book: 'application/vnd.framemaker',
    box: 'application/vnd.previewsystems.box',
    boz: 'application/x-bzip2',
    bpk: 'application/octet-stream',
    btif: 'image/prs.btif',
    bz: 'application/x-bzip',
    bz2: 'application/x-bzip2',
    c: 'text/x-c',
    c11amc: 'application/vnd.cluetrust.cartomobile-config',
    c11amz: 'application/vnd.cluetrust.cartomobile-config-pkg',
    c4d: 'application/vnd.clonk.c4group',
    c4f: 'application/vnd.clonk.c4group',
    c4g: 'application/vnd.clonk.c4group',
    c4p: 'application/vnd.clonk.c4group',
    c4u: 'application/vnd.clonk.c4group',
    cab: 'application/vnd.ms-cab-compressed',
    car: 'application/vnd.curl.car',
    cat: 'application/vnd.ms-pki.seccat',
    cc: 'text/x-c',
    cct: 'application/x-director',
    ccxml: 'application/ccxml+xml',
    cdbcmsg: 'application/vnd.contact.cmsg',
    cdf: 'application/x-netcdf',
    cdkey: 'application/vnd.mediastation.cdkey',
    cdmia: 'application/cdmi-capability',
    cdmic: 'application/cdmi-container',
    cdmid: 'application/cdmi-domain',
    cdmio: 'application/cdmi-object',
    cdmiq: 'application/cdmi-queue',
    cdx: 'chemical/x-cdx',
    cdxml: 'application/vnd.chemdraw+xml',
    cdy: 'application/vnd.cinderella',
    cer: 'application/pkix-cert',
    cfc: 'application/x-coldfusion',
    cfm: 'application/x-coldfusion',
    cgm: 'image/cgm',
    chat: 'application/x-chat',
    chm: 'application/vnd.ms-htmlhelp',
    chrt: 'application/vnd.kde.kchart',
    cif: 'chemical/x-cif',
    cii: 'application/vnd.anser-web-certificate-issue-initiation',
    cil: 'application/vnd.ms-artgalry',
    cla: 'application/vnd.claymore',
    class: 'application/java-vm',
    clkk: 'application/vnd.crick.clicker.keyboard',
    clkp: 'application/vnd.crick.clicker.palette',
    clkt: 'application/vnd.crick.clicker.template',
    clkw: 'application/vnd.crick.clicker.wordbank',
    clkx: 'application/vnd.crick.clicker',
    clp: 'application/x-msclip',
    cmc: 'application/vnd.cosmocaller',
    cmdf: 'chemical/x-cmdf',
    cml: 'chemical/x-cml',
    cmp: 'application/vnd.yellowriver-custom-menu',
    cmx: 'image/x-cmx',
    cod: 'application/vnd.rim.cod',
    com: 'application/x-msdownload',
    conf: 'text/plain',
    cpio: 'application/x-cpio',
    cpp: 'text/x-c',
    cpt: 'application/mac-compactpro',
    crd: 'application/x-mscardfile',
    crl: 'application/pkix-crl',
    crt: 'application/x-x509-ca-cert',
    cryptonote: 'application/vnd.rig.cryptonote',
    cs: 'text/plain',
    csh: 'application/x-csh',
    csml: 'chemical/x-csml',
    csp: 'application/vnd.commonspace',
    css: 'text/css',
    cst: 'application/x-director',
    csv: 'text/csv',
    cu: 'application/cu-seeme',
    curl: 'text/vnd.curl',
    cww: 'application/prs.cww',
    cxt: 'application/x-director',
    cxx: 'text/x-c',
    dae: 'model/vnd.collada+xml',
    daf: 'application/vnd.mobius.daf',
    dataless: 'application/vnd.fdsn.seed',
    davmount: 'application/davmount+xml',
    dcr: 'application/x-director',
    dcurl: 'text/vnd.curl.dcurl',
    dd2: 'application/vnd.oma.dd2+xml',
    ddd: 'application/vnd.fujixerox.ddd',
    deb: 'application/x-debian-package',
    def: 'text/plain',
    deploy: 'application/octet-stream',
    der: 'application/x-x509-ca-cert',
    dfac: 'application/vnd.dreamfactory',
    dic: 'text/x-c',
    dir: 'application/x-director',
    dis: 'application/vnd.mobius.dis',
    dist: 'application/octet-stream',
    distz: 'application/octet-stream',
    djv: 'image/vnd.djvu',
    djvu: 'image/vnd.djvu',
    dll: 'application/x-msdownload',
    dmg: 'application/octet-stream',
    dms: 'application/octet-stream',
    dna: 'application/vnd.dna',
    doc: 'application/msword',
    docm: 'application/vnd.ms-word.document.macroenabled.12',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    dot: 'application/msword',
    dotm: 'application/vnd.ms-word.template.macroenabled.12',
    dotx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    dp: 'application/vnd.osgi.dp',
    dpg: 'application/vnd.dpgraph',
    dra: 'audio/vnd.dra',
    dsc: 'text/prs.lines.tag',
    dssc: 'application/dssc+der',
    dtb: 'application/x-dtbook+xml',
    dtd: 'application/xml-dtd',
    dts: 'audio/vnd.dts',
    dtshd: 'audio/vnd.dts.hd',
    dump: 'application/octet-stream',
    dvi: 'application/x-dvi',
    dwf: 'model/vnd.dwf',
    dwg: 'image/vnd.dwg',
    dxf: 'image/vnd.dxf',
    dxp: 'application/vnd.spotfire.dxp',
    dxr: 'application/x-director',
    ecelp4800: 'audio/vnd.nuera.ecelp4800',
    ecelp7470: 'audio/vnd.nuera.ecelp7470',
    ecelp9600: 'audio/vnd.nuera.ecelp9600',
    ecma: 'application/ecmascript',
    edm: 'application/vnd.novadigm.edm',
    edx: 'application/vnd.novadigm.edx',
    efif: 'application/vnd.picsel',
    ei6: 'application/vnd.pg.osasli',
    elc: 'application/octet-stream',
    eml: 'message/rfc822',
    emma: 'application/emma+xml',
    eol: 'audio/vnd.digital-winds',
    eot: 'application/vnd.ms-fontobject',
    eps: 'application/postscript',
    epub: 'application/epub+zip',
    es3: 'application/vnd.eszigno3+xml',
    esf: 'application/vnd.epson.esf',
    et3: 'application/vnd.eszigno3+xml',
    etx: 'text/x-setext',
    exe: 'application/x-msdownload',
    exi: 'application/exi',
    ext: 'application/vnd.novadigm.ext',
    ez: 'application/andrew-inset',
    ez2: 'application/vnd.ezpix-album',
    ez3: 'application/vnd.ezpix-package',
    f: 'text/x-fortran',
    f4v: 'video/x-f4v',
    f77: 'text/x-fortran',
    f90: 'text/x-fortran',
    fbs: 'image/vnd.fastbidsheet',
    fcs: 'application/vnd.isac.fcs',
    fdf: 'application/vnd.fdf',
    /*eslint-disable-next-line @typescript-eslint/camelcase*/
    fe_launch: 'application/vnd.denovo.fcselayout-link',
    fg5: 'application/vnd.fujitsu.oasysgp',
    fgd: 'application/x-director',
    fh: 'image/x-freehand',
    fh4: 'image/x-freehand',
    fh5: 'image/x-freehand',
    fh7: 'image/x-freehand',
    fhc: 'image/x-freehand',
    fig: 'application/x-xfig',
    fli: 'video/x-fli',
    flo: 'application/vnd.micrografx.flo',
    flv: 'video/x-flv',
    flw: 'application/vnd.kde.kivio',
    flx: 'text/vnd.fmi.flexstor',
    fly: 'text/vnd.fly',
    fm: 'application/vnd.framemaker',
    fnc: 'application/vnd.frogans.fnc',
    for: 'text/x-fortran',
    fpx: 'image/vnd.fpx',
    frame: 'application/vnd.framemaker',
    fsc: 'application/vnd.fsc.weblaunch',
    fst: 'image/vnd.fst',
    ftc: 'application/vnd.fluxtime.clip',
    fti: 'application/vnd.anser-web-funds-transfer-initiation',
    fvt: 'video/vnd.fvt',
    fxp: 'application/vnd.adobe.fxp',
    fxpl: 'application/vnd.adobe.fxp',
    fzs: 'application/vnd.fuzzysheet',
    g2w: 'application/vnd.geoplan',
    g3: 'image/g3fax',
    g3w: 'application/vnd.geospace',
    gac: 'application/vnd.groove-account',
    gdl: 'model/vnd.gdl',
    geo: 'application/vnd.dynageo',
    gex: 'application/vnd.geometry-explorer',
    ggb: 'application/vnd.geogebra.file',
    ggt: 'application/vnd.geogebra.tool',
    ghf: 'application/vnd.groove-help',
    gif: 'image/gif',
    gim: 'application/vnd.groove-identity-message',
    gmx: 'application/vnd.gmx',
    gnumeric: 'application/x-gnumeric',
    gph: 'application/vnd.flographit',
    gqf: 'application/vnd.grafeq',
    gqs: 'application/vnd.grafeq',
    gram: 'application/srgs',
    gre: 'application/vnd.geometry-explorer',
    grv: 'application/vnd.groove-injector',
    grxml: 'application/srgs+xml',
    gsf: 'application/x-font-ghostscript',
    gtar: 'application/x-gtar',
    gtm: 'application/vnd.groove-tool-message',
    gtw: 'model/vnd.gtw',
    gv: 'text/vnd.graphviz',
    gxt: 'application/vnd.geonext',
    h: 'text/x-c',
    h261: 'video/h261',
    h263: 'video/h263',
    h264: 'video/h264',
    hal: 'application/vnd.hal+xml',
    hbci: 'application/vnd.hbci',
    hdf: 'application/x-hdf',
    hh: 'text/x-c',
    hlp: 'application/winhlp',
    hpgl: 'application/vnd.hp-hpgl',
    hpid: 'application/vnd.hp-hpid',
    hps: 'application/vnd.hp-hps',
    hqx: 'application/mac-binhex40',
    hta: 'application/octet-stream',
    htc: 'text/html',
    htke: 'application/vnd.kenameaapp',
    htm: 'text/html',
    html: 'text/html',
    hvd: 'application/vnd.yamaha.hv-dic',
    hvp: 'application/vnd.yamaha.hv-voice',
    hvs: 'application/vnd.yamaha.hv-script',
    i2g: 'application/vnd.intergeo',
    icc: 'application/vnd.iccprofile',
    ice: 'x-conference/x-cooltalk',
    icm: 'application/vnd.iccprofile',
    ico: 'image/x-icon',
    ics: 'text/calendar',
    ief: 'image/ief',
    ifb: 'text/calendar',
    ifm: 'application/vnd.shana.informed.formdata',
    iges: 'model/iges',
    igl: 'application/vnd.igloader',
    igm: 'application/vnd.insors.igm',
    igs: 'model/iges',
    igx: 'application/vnd.micrografx.igx',
    iif: 'application/vnd.shana.informed.interchange',
    imp: 'application/vnd.accpac.simply.imp',
    ims: 'application/vnd.ms-ims',
    in: 'text/plain',
    ini: 'text/plain',
    ipfix: 'application/ipfix',
    ipk: 'application/vnd.shana.informed.package',
    irm: 'application/vnd.ibm.rights-management',
    irp: 'application/vnd.irepository.package+xml',
    iso: 'application/octet-stream',
    itp: 'application/vnd.shana.informed.formtemplate',
    ivp: 'application/vnd.immervision-ivp',
    ivu: 'application/vnd.immervision-ivu',
    jad: 'text/vnd.sun.j2me.app-descriptor',
    jam: 'application/vnd.jam',
    jar: 'application/java-archive',
    java: 'text/x-java-source',
    jisp: 'application/vnd.jisp',
    jlt: 'application/vnd.hp-jlyt',
    jnlp: 'application/x-java-jnlp-file',
    joda: 'application/vnd.joost.joda-archive',
    jpe: 'image/jpeg',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    jpgm: 'video/jpm',
    jpgv: 'video/jpeg',
    jpm: 'video/jpm',
    js: 'text/javascript',
    json: 'application/json',
    kar: 'audio/midi',
    karbon: 'application/vnd.kde.karbon',
    kfo: 'application/vnd.kde.kformula',
    kia: 'application/vnd.kidspiration',
    kml: 'application/vnd.google-earth.kml+xml',
    kmz: 'application/vnd.google-earth.kmz',
    kne: 'application/vnd.kinar',
    knp: 'application/vnd.kinar',
    kon: 'application/vnd.kde.kontour',
    kpr: 'application/vnd.kde.kpresenter',
    kpt: 'application/vnd.kde.kpresenter',
    ksp: 'application/vnd.kde.kspread',
    ktr: 'application/vnd.kahootz',
    ktx: 'image/ktx',
    ktz: 'application/vnd.kahootz',
    kwd: 'application/vnd.kde.kword',
    kwt: 'application/vnd.kde.kword',
    lasxml: 'application/vnd.las.las+xml',
    latex: 'application/x-latex',
    lbd: 'application/vnd.llamagraphics.life-balance.desktop',
    lbe: 'application/vnd.llamagraphics.life-balance.exchange+xml',
    les: 'application/vnd.hhe.lesson-player',
    lha: 'application/octet-stream',
    link66: 'application/vnd.route66.link66+xml',
    list: 'text/plain',
    list3820: 'application/vnd.ibm.modcap',
    listafp: 'application/vnd.ibm.modcap',
    log: 'text/plain',
    lostxml: 'application/lost+xml',
    lrf: 'application/octet-stream',
    lrm: 'application/vnd.ms-lrm',
    ltf: 'application/vnd.frogans.ltf',
    lvp: 'audio/vnd.lucent.voice',
    lwp: 'application/vnd.lotus-wordpro',
    lzh: 'application/octet-stream',
    m13: 'application/x-msmediaview',
    m14: 'application/x-msmediaview',
    m1v: 'video/mpeg',
    m21: 'application/mp21',
    m2a: 'audio/mpeg',
    m2v: 'video/mpeg',
    m3a: 'audio/mpeg',
    m3u: 'audio/x-mpegurl',
    m3u8: 'application/vnd.apple.mpegurl',
    m4a: 'audio/mp4',
    m4u: 'video/vnd.mpegurl',
    m4v: 'video/mp4',
    ma: 'application/mathematica',
    mads: 'application/mads+xml',
    mag: 'application/vnd.ecowin.chart',
    maker: 'application/vnd.framemaker',
    man: 'text/troff',
    mathml: 'application/mathml+xml',
    mb: 'application/mathematica',
    mbk: 'application/vnd.mobius.mbk',
    mbox: 'application/mbox',
    mc1: 'application/vnd.medcalcdata',
    mcd: 'application/vnd.mcd',
    mcurl: 'text/vnd.curl.mcurl',
    mdb: 'application/x-msaccess',
    mdi: 'image/vnd.ms-modi',
    me: 'text/troff',
    mesh: 'model/mesh',
    meta4: 'application/metalink4+xml',
    mets: 'application/mets+xml',
    mfm: 'application/vnd.mfmp',
    mgp: 'application/vnd.osgeo.mapguide.package',
    mgz: 'application/vnd.proteus.magazine',
    mid: 'audio/midi',
    midi: 'audio/midi',
    mif: 'application/vnd.mif',
    mime: 'message/rfc822',
    mj2: 'video/mj2',
    mjp2: 'video/mj2',
    mlp: 'application/vnd.dolby.mlp',
    mmd: 'application/vnd.chipnuts.karaoke-mmd',
    mmf: 'application/vnd.smaf',
    mmr: 'image/vnd.fujixerox.edmics-mmr',
    mny: 'application/x-msmoney',
    mobi: 'application/x-mobipocket-ebook',
    mods: 'application/mods+xml',
    mov: 'video/quicktime',
    movie: 'video/x-sgi-movie',
    mp2: 'audio/mpeg',
    mp21: 'application/mp21',
    mp2a: 'audio/mpeg',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    mp4a: 'audio/mp4',
    mp4s: 'application/mp4',
    mp4v: 'video/mp4',
    mpc: 'application/vnd.mophun.certificate',
    mpe: 'video/mpeg',
    mpeg: 'video/mpeg',
    mpg: 'video/mpeg',
    mpg4: 'video/mp4',
    mpga: 'audio/mpeg',
    mpkg: 'application/vnd.apple.installer+xml',
    mpm: 'application/vnd.blueice.multipass',
    mpn: 'application/vnd.mophun.application',
    mpp: 'application/vnd.ms-project',
    mpt: 'application/vnd.ms-project',
    mpy: 'application/vnd.ibm.minipay',
    mqy: 'application/vnd.mobius.mqy',
    mrc: 'application/marc',
    mrcx: 'application/marcxml+xml',
    ms: 'text/troff',
    mscml: 'application/mediaservercontrol+xml',
    mseed: 'application/vnd.fdsn.mseed',
    mseq: 'application/vnd.mseq',
    msf: 'application/vnd.epson.msf',
    msh: 'model/mesh',
    msi: 'application/x-msdownload',
    msl: 'application/vnd.mobius.msl',
    msty: 'application/vnd.muvee.style',
    mts: 'model/vnd.mts',
    mus: 'application/vnd.musician',
    musicxml: 'application/vnd.recordare.musicxml+xml',
    mvb: 'application/x-msmediaview',
    mwf: 'application/vnd.mfer',
    mxf: 'application/mxf',
    mxl: 'application/vnd.recordare.musicxml',
    mxml: 'application/xv+xml',
    mxs: 'application/vnd.triscape.mxs',
    mxu: 'video/vnd.mpegurl',
    'n-gage': 'application/vnd.nokia.n-gage.symbian.install',
    n3: 'text/n3',
    nb: 'application/mathematica',
    nbp: 'application/vnd.wolfram.player',
    nc: 'application/x-netcdf',
    ncx: 'application/x-dtbncx+xml',
    ngdat: 'application/vnd.nokia.n-gage.data',
    nlu: 'application/vnd.neurolanguage.nlu',
    nml: 'application/vnd.enliven',
    nnd: 'application/vnd.noblenet-directory',
    nns: 'application/vnd.noblenet-sealer',
    nnw: 'application/vnd.noblenet-web',
    npx: 'image/vnd.net-fpx',
    nsf: 'application/vnd.lotus-notes',
    oa2: 'application/vnd.fujitsu.oasys2',
    oa3: 'application/vnd.fujitsu.oasys3',
    oas: 'application/vnd.fujitsu.oasys',
    obd: 'application/x-msbinder',
    oda: 'application/oda',
    odb: 'application/vnd.oasis.opendocument.database',
    odc: 'application/vnd.oasis.opendocument.chart',
    odf: 'application/vnd.oasis.opendocument.formula',
    odft: 'application/vnd.oasis.opendocument.formula-template',
    odg: 'application/vnd.oasis.opendocument.graphics',
    odi: 'application/vnd.oasis.opendocument.image',
    odm: 'application/vnd.oasis.opendocument.text-master',
    odp: 'application/vnd.oasis.opendocument.presentation',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    odt: 'application/vnd.oasis.opendocument.text',
    oga: 'audio/ogg',
    ogg: 'audio/ogg',
    ogv: 'video/ogg',
    ogx: 'application/ogg',
    onepkg: 'application/onenote',
    onetmp: 'application/onenote',
    onetoc: 'application/onenote',
    onetoc2: 'application/onenote',
    opf: 'application/oebps-package+xml',
    oprc: 'application/vnd.palm',
    org: 'application/vnd.lotus-organizer',
    osf: 'application/vnd.yamaha.openscoreformat',
    osfpvg: 'application/vnd.yamaha.openscoreformat.osfpvg+xml',
    otc: 'application/vnd.oasis.opendocument.chart-template',
    otf: 'application/x-font-otf',
    otg: 'application/vnd.oasis.opendocument.graphics-template',
    oth: 'application/vnd.oasis.opendocument.text-web',
    oti: 'application/vnd.oasis.opendocument.image-template',
    otp: 'application/vnd.oasis.opendocument.presentation-template',
    ots: 'application/vnd.oasis.opendocument.spreadsheet-template',
    ott: 'application/vnd.oasis.opendocument.text-template',
    oxt: 'application/vnd.openofficeorg.extension',
    p: 'text/x-pascal',
    p10: 'application/pkcs10',
    p12: 'application/x-pkcs12',
    p7b: 'application/x-pkcs7-certificates',
    p7c: 'application/pkcs7-mime',
    p7m: 'application/pkcs7-mime',
    p7r: 'application/x-pkcs7-certreqresp',
    p7s: 'application/pkcs7-signature',
    p8: 'application/pkcs8',
    pas: 'text/x-pascal',
    paw: 'application/vnd.pawaafile',
    pbd: 'application/vnd.powerbuilder6',
    pbm: 'image/x-portable-bitmap',
    pcf: 'application/x-font-pcf',
    pcl: 'application/vnd.hp-pcl',
    pclxl: 'application/vnd.hp-pclxl',
    pct: 'image/x-pict',
    pcurl: 'application/vnd.curl.pcurl',
    pcx: 'image/x-pcx',
    pdb: 'application/vnd.palm',
    pdf: 'application/pdf',
    pfa: 'application/x-font-type1',
    pfb: 'application/x-font-type1',
    pfm: 'application/x-font-type1',
    pfr: 'application/font-tdpfr',
    pfx: 'application/x-pkcs12',
    pgm: 'image/x-portable-graymap',
    pgn: 'application/x-chess-pgn',
    pgp: 'application/pgp-encrypted',
    php: 'text/x-php',
    phps: 'application/x-httpd-phps',
    pic: 'image/x-pict',
    pkg: 'application/octet-stream',
    pki: 'application/pkixcmp',
    pkipath: 'application/pkix-pkipath',
    plb: 'application/vnd.3gpp.pic-bw-large',
    plc: 'application/vnd.mobius.plc',
    plf: 'application/vnd.pocketlearn',
    pls: 'application/pls+xml',
    pml: 'application/vnd.ctc-posml',
    png: 'image/png',
    pnm: 'image/x-portable-anymap',
    portpkg: 'application/vnd.macports.portpkg',
    pot: 'application/vnd.ms-powerpoint',
    potm: 'application/vnd.ms-powerpoint.template.macroenabled.12',
    potx: 'application/vnd.openxmlformats-officedocument.presentationml.template',
    ppam: 'application/vnd.ms-powerpoint.addin.macroenabled.12',
    ppd: 'application/vnd.cups-ppd',
    ppm: 'image/x-portable-pixmap',
    pps: 'application/vnd.ms-powerpoint',
    ppsm: 'application/vnd.ms-powerpoint.slideshow.macroenabled.12',
    ppsx: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    ppt: 'application/vnd.ms-powerpoint',
    pptm: 'application/vnd.ms-powerpoint.presentation.macroenabled.12',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    pqa: 'application/vnd.palm',
    prc: 'application/x-mobipocket-ebook',
    pre: 'application/vnd.lotus-freelance',
    prf: 'application/pics-rules',
    ps: 'application/postscript',
    psb: 'application/vnd.3gpp.pic-bw-small',
    psd: 'image/vnd.adobe.photoshop',
    psf: 'application/x-font-linux-psf',
    pskcxml: 'application/pskc+xml',
    ptid: 'application/vnd.pvi.ptid1',
    pub: 'application/x-mspublisher',
    pvb: 'application/vnd.3gpp.pic-bw-var',
    pwn: 'application/vnd.3m.post-it-notes',
    pya: 'audio/vnd.ms-playready.media.pya',
    pyv: 'video/vnd.ms-playready.media.pyv',
    qam: 'application/vnd.epson.quickanime',
    qbo: 'application/vnd.intu.qbo',
    qfx: 'application/vnd.intu.qfx',
    qps: 'application/vnd.publishare-delta-tree',
    qt: 'video/quicktime',
    qwd: 'application/vnd.quark.quarkxpress',
    qwt: 'application/vnd.quark.quarkxpress',
    qxb: 'application/vnd.quark.quarkxpress',
    qxd: 'application/vnd.quark.quarkxpress',
    qxl: 'application/vnd.quark.quarkxpress',
    qxt: 'application/vnd.quark.quarkxpress',
    ra: 'audio/x-pn-realaudio',
    ram: 'audio/x-pn-realaudio',
    rar: 'application/x-rar-compressed',
    ras: 'image/x-cmu-raster',
    rb: 'text/plain',
    rcprofile: 'application/vnd.ipunplugged.rcprofile',
    rdf: 'application/rdf+xml',
    rdz: 'application/vnd.data-vision.rdz',
    rep: 'application/vnd.businessobjects',
    res: 'application/x-dtbresource+xml',
    resx: 'text/xml',
    rgb: 'image/x-rgb',
    rif: 'application/reginfo+xml',
    rip: 'audio/vnd.rip',
    rl: 'application/resource-lists+xml',
    rlc: 'image/vnd.fujixerox.edmics-rlc',
    rld: 'application/resource-lists-diff+xml',
    rm: 'application/vnd.rn-realmedia',
    rmi: 'audio/midi',
    rmp: 'audio/x-pn-realaudio-plugin',
    rms: 'application/vnd.jcp.javame.midlet-rms',
    rnc: 'application/relax-ng-compact-syntax',
    roff: 'text/troff',
    rp9: 'application/vnd.cloanto.rp9',
    rpss: 'application/vnd.nokia.radio-presets',
    rpst: 'application/vnd.nokia.radio-preset',
    rq: 'application/sparql-query',
    rs: 'application/rls-services+xml',
    rsd: 'application/rsd+xml',
    rss: 'application/rss+xml',
    rtf: 'application/rtf',
    rtx: 'text/richtext',
    s: 'text/x-asm',
    saf: 'application/vnd.yamaha.smaf-audio',
    sbml: 'application/sbml+xml',
    sc: 'application/vnd.ibm.secure-container',
    scd: 'application/x-msschedule',
    scm: 'application/vnd.lotus-screencam',
    scq: 'application/scvp-cv-request',
    scs: 'application/scvp-cv-response',
    scurl: 'text/vnd.curl.scurl',
    sda: 'application/vnd.stardivision.draw',
    sdc: 'application/vnd.stardivision.calc',
    sdd: 'application/vnd.stardivision.impress',
    sdkd: 'application/vnd.solent.sdkm+xml',
    sdkm: 'application/vnd.solent.sdkm+xml',
    sdp: 'application/sdp',
    sdw: 'application/vnd.stardivision.writer',
    see: 'application/vnd.seemail',
    seed: 'application/vnd.fdsn.seed',
    sema: 'application/vnd.sema',
    semd: 'application/vnd.semd',
    semf: 'application/vnd.semf',
    ser: 'application/java-serialized-object',
    setpay: 'application/set-payment-initiation',
    setreg: 'application/set-registration-initiation',
    'sfd-hdstx': 'application/vnd.hydrostatix.sof-data',
    sfs: 'application/vnd.spotfire.sfs',
    sgl: 'application/vnd.stardivision.writer-global',
    sgm: 'text/sgml',
    sgml: 'text/sgml',
    sh: 'application/x-sh',
    shar: 'application/x-shar',
    shf: 'application/shf+xml',
    sig: 'application/pgp-signature',
    silo: 'model/mesh',
    sis: 'application/vnd.symbian.install',
    sisx: 'application/vnd.symbian.install',
    sit: 'application/x-stuffit',
    sitx: 'application/x-stuffitx',
    skd: 'application/vnd.koan',
    skm: 'application/vnd.koan',
    skp: 'application/vnd.koan',
    skt: 'application/vnd.koan',
    sldm: 'application/vnd.ms-powerpoint.slide.macroenabled.12',
    sldx: 'application/vnd.openxmlformats-officedocument.presentationml.slide',
    slt: 'application/vnd.epson.salt',
    sm: 'application/vnd.stepmania.stepchart',
    smf: 'application/vnd.stardivision.math',
    smi: 'application/smil+xml',
    smil: 'application/smil+xml',
    snd: 'audio/basic',
    snf: 'application/x-font-snf',
    so: 'application/octet-stream',
    spc: 'application/x-pkcs7-certificates',
    spf: 'application/vnd.yamaha.smaf-phrase',
    spl: 'application/x-futuresplash',
    spot: 'text/vnd.in3d.spot',
    spp: 'application/scvp-vp-response',
    spq: 'application/scvp-vp-request',
    spx: 'audio/ogg',
    src: 'application/x-wais-source',
    srt: 'application/octet-stream',
    sru: 'application/sru+xml',
    srx: 'application/sparql-results+xml',
    sse: 'application/vnd.kodak-descriptor',
    ssf: 'application/vnd.epson.ssf',
    ssml: 'application/ssml+xml',
    st: 'application/vnd.sailingtracker.track',
    stc: 'application/vnd.sun.xml.calc.template',
    std: 'application/vnd.sun.xml.draw.template',
    stf: 'application/vnd.wt.stf',
    sti: 'application/vnd.sun.xml.impress.template',
    stk: 'application/hyperstudio',
    stl: 'application/vnd.ms-pki.stl',
    str: 'application/vnd.pg.format',
    stw: 'application/vnd.sun.xml.writer.template',
    sub: 'image/vnd.dvb.subtitle',
    sus: 'application/vnd.sus-calendar',
    susp: 'application/vnd.sus-calendar',
    sv4cpio: 'application/x-sv4cpio',
    sv4crc: 'application/x-sv4crc',
    svc: 'application/vnd.dvb.service',
    svd: 'application/vnd.svd',
    svg: 'image/svg+xml',
    svgz: 'image/svg+xml',
    swa: 'application/x-director',
    swf: 'application/x-shockwave-flash',
    swi: 'application/vnd.aristanetworks.swi',
    sxc: 'application/vnd.sun.xml.calc',
    sxd: 'application/vnd.sun.xml.draw',
    sxg: 'application/vnd.sun.xml.writer.global',
    sxi: 'application/vnd.sun.xml.impress',
    sxm: 'application/vnd.sun.xml.math',
    sxw: 'application/vnd.sun.xml.writer',
    t: 'text/troff',
    tao: 'application/vnd.tao.intent-module-archive',
    tar: 'application/x-tar',
    tcap: 'application/vnd.3gpp2.tcap',
    tcl: 'application/x-tcl',
    teacher: 'application/vnd.smart.teacher',
    tei: 'application/tei+xml',
    teicorpus: 'application/tei+xml',
    tex: 'application/x-tex',
    texi: 'application/x-texinfo',
    texinfo: 'application/x-texinfo',
    text: 'text/plain',
    tfi: 'application/thraud+xml',
    tfm: 'application/x-tex-tfm',
    thmx: 'application/vnd.ms-officetheme',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    tmo: 'application/vnd.tmobile-livetv',
    torrent: 'application/x-bittorrent',
    tpl: 'application/vnd.groove-tool-template',
    tpt: 'application/vnd.trid.tpt',
    tr: 'text/troff',
    tra: 'application/vnd.trueapp',
    trm: 'application/x-msterminal',
    tsd: 'application/timestamped-data',
    tsv: 'text/tab-separated-values',
    ttc: 'application/x-font-ttf',
    ttf: 'application/x-font-ttf',
    ttl: 'text/turtle',
    twd: 'application/vnd.simtech-mindmapper',
    twds: 'application/vnd.simtech-mindmapper',
    txd: 'application/vnd.genomatix.tuxedo',
    txf: 'application/vnd.mobius.txf',
    txt: 'text/plain',
    u32: 'application/x-authorware-bin',
    udeb: 'application/x-debian-package',
    ufd: 'application/vnd.ufdl',
    ufdl: 'application/vnd.ufdl',
    umj: 'application/vnd.umajin',
    unityweb: 'application/vnd.unity',
    uoml: 'application/vnd.uoml+xml',
    uri: 'text/uri-list',
    uris: 'text/uri-list',
    urls: 'text/uri-list',
    ustar: 'application/x-ustar',
    utz: 'application/vnd.uiq.theme',
    uu: 'text/x-uuencode',
    uva: 'audio/vnd.dece.audio',
    uvd: 'application/vnd.dece.data',
    uvf: 'application/vnd.dece.data',
    uvg: 'image/vnd.dece.graphic',
    uvh: 'video/vnd.dece.hd',
    uvi: 'image/vnd.dece.graphic',
    uvm: 'video/vnd.dece.mobile',
    uvp: 'video/vnd.dece.pd',
    uvs: 'video/vnd.dece.sd',
    uvt: 'application/vnd.dece.ttml+xml',
    uvu: 'video/vnd.uvvu.mp4',
    uvv: 'video/vnd.dece.video',
    uvva: 'audio/vnd.dece.audio',
    uvvd: 'application/vnd.dece.data',
    uvvf: 'application/vnd.dece.data',
    uvvg: 'image/vnd.dece.graphic',
    uvvh: 'video/vnd.dece.hd',
    uvvi: 'image/vnd.dece.graphic',
    uvvm: 'video/vnd.dece.mobile',
    uvvp: 'video/vnd.dece.pd',
    uvvs: 'video/vnd.dece.sd',
    uvvt: 'application/vnd.dece.ttml+xml',
    uvvu: 'video/vnd.uvvu.mp4',
    uvvv: 'video/vnd.dece.video',
    uvvx: 'application/vnd.dece.unspecified',
    uvx: 'application/vnd.dece.unspecified',
    vcd: 'application/x-cdlink',
    vcf: 'text/x-vcard',
    vcg: 'application/vnd.groove-vcard',
    vcs: 'text/x-vcalendar',
    vcx: 'application/vnd.vcx',
    vis: 'application/vnd.visionary',
    viv: 'video/vnd.vivo',
    vor: 'application/vnd.stardivision.writer',
    vox: 'application/x-authorware-bin',
    vrml: 'model/vrml',
    vsd: 'application/vnd.visio',
    vsf: 'application/vnd.vsf',
    vss: 'application/vnd.visio',
    vst: 'application/vnd.visio',
    vsw: 'application/vnd.visio',
    vtu: 'model/vnd.vtu',
    vxml: 'application/voicexml+xml',
    w3d: 'application/x-director',
    wad: 'application/x-doom',
    wav: 'audio/x-wav',
    wax: 'audio/x-ms-wax',
    wbmp: 'image/vnd.wap.wbmp',
    wbs: 'application/vnd.criticaltools.wbs+xml',
    wbxml: 'application/vnd.wap.wbxml',
    wcm: 'application/vnd.ms-works',
    wdb: 'application/vnd.ms-works',
    weba: 'audio/webm',
    webm: 'video/webm',
    webp: 'image/webp',
    wg: 'application/vnd.pmi.widget',
    wgt: 'application/widget',
    wks: 'application/vnd.ms-works',
    wm: 'video/x-ms-wm',
    wma: 'audio/x-ms-wma',
    wmd: 'application/x-ms-wmd',
    wmf: 'application/x-msmetafile',
    wml: 'text/vnd.wap.wml',
    wmlc: 'application/vnd.wap.wmlc',
    wmls: 'text/vnd.wap.wmlscript',
    wmlsc: 'application/vnd.wap.wmlscriptc',
    wmv: 'video/x-ms-wmv',
    wmx: 'video/x-ms-wmx',
    wmz: 'application/x-ms-wmz',
    woff: 'application/x-font-woff',
    wpd: 'application/vnd.wordperfect',
    wpl: 'application/vnd.ms-wpl',
    wps: 'application/vnd.ms-works',
    wqd: 'application/vnd.wqd',
    wri: 'application/x-mswrite',
    wrl: 'model/vrml',
    wsdl: 'application/wsdl+xml',
    wspolicy: 'application/wspolicy+xml',
    wtb: 'application/vnd.webturbo',
    wvx: 'video/x-ms-wvx',
    x32: 'application/x-authorware-bin',
    x3d: 'application/vnd.hzn-3d-crossword',
    xap: 'application/x-silverlight-app',
    xar: 'application/vnd.xara',
    xbap: 'application/x-ms-xbap',
    xbd: 'application/vnd.fujixerox.docuworks.binder',
    xbm: 'image/x-xbitmap',
    xdf: 'application/xcap-diff+xml',
    xdm: 'application/vnd.syncml.dm+xml',
    xdp: 'application/vnd.adobe.xdp+xml',
    xdssc: 'application/dssc+xml',
    xdw: 'application/vnd.fujixerox.docuworks',
    xenc: 'application/xenc+xml',
    xer: 'application/patch-ops-error+xml',
    xfdf: 'application/vnd.adobe.xfdf',
    xfdl: 'application/vnd.xfdl',
    xht: 'application/xhtml+xml',
    xhtml: 'application/xhtml+xml',
    xhvml: 'application/xv+xml',
    xif: 'image/vnd.xiff',
    xla: 'application/vnd.ms-excel',
    xlam: 'application/vnd.ms-excel.addin.macroenabled.12',
    xlc: 'application/vnd.ms-excel',
    xlm: 'application/vnd.ms-excel',
    xls: 'application/vnd.ms-excel',
    xlsb: 'application/vnd.ms-excel.sheet.binary.macroenabled.12',
    xlsm: 'application/vnd.ms-excel.sheet.macroenabled.12',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xlt: 'application/vnd.ms-excel',
    xltm: 'application/vnd.ms-excel.template.macroenabled.12',
    xltx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    xlw: 'application/vnd.ms-excel',
    xml: 'application/xml',
    xo: 'application/vnd.olpc-sugar',
    xop: 'application/xop+xml',
    xpi: 'application/x-xpinstall',
    xpm: 'image/x-xpixmap',
    xpr: 'application/vnd.is-xpr',
    xps: 'application/vnd.ms-xpsdocument',
    xpw: 'application/vnd.intercon.formnet',
    xpx: 'application/vnd.intercon.formnet',
    xsl: 'application/xml',
    xslt: 'application/xslt+xml',
    xsm: 'application/vnd.syncml+xml',
    xspf: 'application/xspf+xml',
    xul: 'application/vnd.mozilla.xul+xml',
    xvm: 'application/xv+xml',
    xvml: 'application/xv+xml',
    xwd: 'image/x-xwindowdump',
    xyz: 'chemical/x-xyz',
    yaml: 'text/yaml',
    yang: 'application/yang',
    yin: 'application/yin+xml',
    yml: 'text/yaml',
    zaz: 'application/vnd.zzazz.deck+xml',
    zip: 'application/zip',
    zir: 'application/vnd.zul',
    zirz: 'application/vnd.zul',
    zmm: 'application/vnd.handheld-entertainment+xml',
    tmx: 'application/x-tmx',
    tbx: 'application/x-tbx',
};
class UploadStorage extends core_1.CrowdinApi {
    listStorages(options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/storages`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param fileName file name
     * @param request binary file data
     * @param contentType content type header
     * @see https://support.crowdin.com/api/v2/#operation/api.storages.post
     */
    addStorage(fileName, request, contentType) {
        const url = `${this.url}/storages`;
        const config = this.defaultConfig();
        config.headers['Crowdin-API-FileName'] = fileName;
        if (contentType) {
            config.headers['Content-Type'] = contentType;
        }
        else {
            const fileNameParts = fileName.split('.');
            let contentType;
            if (fileNameParts.length > 1) {
                const fileExtrension = fileNameParts[fileNameParts.length - 1];
                contentType = mimetypes[fileExtrension];
            }
            config.headers['Content-Type'] = contentType !== null && contentType !== void 0 ? contentType : 'application/octet-stream';
        }
        return this.post(url, request, config);
    }
    /**
     * @param storageId storage identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.storages.get
     */
    getStorage(storageId) {
        const url = `${this.url}/storages/${storageId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param storageId storage identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.storages.delete
     */
    deleteStorage(storageId) {
        const url = `${this.url}/storages/${storageId}`;
        return this.delete(url, this.defaultConfig());
    }
}
exports.UploadStorage = UploadStorage;


/***/ }),

/***/ 8865:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Users = void 0;
const core_1 = __nccwpck_require__(4275);
class Users extends core_1.CrowdinApi {
    listProjectMembers(projectId, options, deprecatedRole, deprecatedLanguageId, deprecatedLimit, deprecatedOffset) {
        let url = `${this.url}/projects/${projectId}/members`;
        if ((0, core_1.isOptionalString)(options, '1' in arguments)) {
            options = {
                search: options,
                role: deprecatedRole,
                languageId: deprecatedLanguageId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
        }
        url = this.addQueryParam(url, 'search', options.search);
        url = this.addQueryParam(url, 'role', options.role);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.members.post
     */
    addProjectMember(projectId, request) {
        const url = `${this.url}/projects/${projectId}/members`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.members.get
     */
    getProjectMemberPermissions(projectId, memberId) {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.members.put
     */
    replaceProjectMemberPermissions(projectId, memberId, request = {}) {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.put(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.members.delete
     */
    deleteMemberFromProject(projectId, memberId) {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.delete(url, this.defaultConfig());
    }
    listUsers(options, deprecatedSearch, deprecatedTwoFactor, deprecatedLimit, deprecatedOffset) {
        let url = `${this.url}/users`;
        if ((0, core_1.isOptionalString)(options, '0' in arguments)) {
            options = {
                status: options,
                search: deprecatedSearch,
                twoFactor: deprecatedTwoFactor,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
        }
        url = this.addQueryParam(url, 'status', options.status);
        url = this.addQueryParam(url, 'search', options.search);
        url = this.addQueryParam(url, 'twoFactor', options.twoFactor);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.post
     */
    inviteUser(request) {
        const url = `${this.url}/users`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param userId user identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.getById
     */
    getUserInfo(userId) {
        const url = `${this.url}/users/${userId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param userId user identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.delete
     */
    deleteUser(userId) {
        const url = `${this.url}/users/${userId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param userId user identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.patch
     */
    editUser(userId, request) {
        const url = `${this.url}/users/${userId}`;
        return this.patch(url, request, this.defaultConfig());
    }
    /**
     * @see https://support.crowdin.com/api/v2/#operation/api.user.get
     */
    getAuthenticatedUser() {
        const url = `${this.url}/user`;
        return this.get(url, this.defaultConfig());
    }
}
exports.Users = Users;


/***/ }),

/***/ 5770:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vendors = void 0;
const core_1 = __nccwpck_require__(4275);
class Vendors extends core_1.CrowdinApi {
    listVendors(options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/vendors`;
        return this.getList(url, options.limit, options.offset);
    }
}
exports.Vendors = Vendors;


/***/ }),

/***/ 919:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Webhooks = void 0;
const core_1 = __nccwpck_require__(4275);
class Webhooks extends core_1.CrowdinApi {
    listWebhooks(projectId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/webhooks`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.post
     */
    addWebhook(projectId, request) {
        const url = `${this.url}/projects/${projectId}/webhooks`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.get
     */
    getWebhook(projectId, webhookId) {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.delete
     */
    deleteWebhook(projectId, webhookId) {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.patch
     */
    editWebhook(projectId, webhookId, request) {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}
exports.Webhooks = Webhooks;


/***/ }),

/***/ 6184:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Workflows = void 0;
const core_1 = __nccwpck_require__(4275);
class Workflows extends core_1.CrowdinApi {
    listWorkflowSteps(projectId, options, deprecatedOffset) {
        if ((0, core_1.isOptionalNumber)(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/workflow-steps`;
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param projectId project identifier
     * @param stepId workflow step identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    getWorkflowStep(projectId, stepId) {
        const url = `${this.url}/projects/${projectId}/workflow-steps/${stepId}`;
        return this.get(url, this.defaultConfig());
    }
    listWorkflowTemplates(options, deprecatedLimit, deprecatedOffset) {
        let url = `${this.url}/workflow-templates`;
        if ((0, core_1.isOptionalNumber)(options, '0' in arguments)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        url = this.addQueryParam(url, 'groupId', options.groupId);
        return this.getList(url, options.limit, options.offset);
    }
    /**
     * @param templateId workflow template identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.workflow-templates.get
     */
    getWorkflowTemplateInfo(templateId) {
        const url = `${this.url}/workflow-templates/${templateId}`;
        return this.get(url, this.defaultConfig());
    }
}
exports.Workflows = Workflows;


/***/ }),

/***/ 6545:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(2618);

/***/ }),

/***/ 8104:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);
var settle = __nccwpck_require__(3211);
var buildFullPath = __nccwpck_require__(1934);
var buildURL = __nccwpck_require__(646);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var httpFollow = (__nccwpck_require__(7707).http);
var httpsFollow = (__nccwpck_require__(7707).https);
var url = __nccwpck_require__(7310);
var zlib = __nccwpck_require__(9796);
var pkg = __nccwpck_require__(8593);
var createError = __nccwpck_require__(5226);
var enhanceError = __nccwpck_require__(1516);

var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    if ('User-Agent' in headers || 'user-agent' in headers) {
      // User-Agent is specified; handle case where no UA header is desired
      if (!headers['User-Agent'] && !headers['user-agent']) {
        delete headers['User-Agent'];
        delete headers['user-agent'];
      }
      // Otherwise, use specified value
    } else {
      // Only set header if it hasn't been set in config
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        var totalResponseBytes = 0;
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(createError(
          'error trying to parse `config.timeout` to int',
          config,
          'ERR_PARSE_TIMEOUT',
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError(
          'timeout of ' + timeout + 'ms exceeded',
          config,
          config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
          req
        ));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ 3454:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);
var settle = __nccwpck_require__(3211);
var cookies = __nccwpck_require__(1545);
var buildURL = __nccwpck_require__(646);
var buildFullPath = __nccwpck_require__(1934);
var parseHeaders = __nccwpck_require__(6455);
var isURLSameOrigin = __nccwpck_require__(3608);
var createError = __nccwpck_require__(5226);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ 2618:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);
var bind = __nccwpck_require__(7065);
var Axios = __nccwpck_require__(8178);
var mergeConfig = __nccwpck_require__(4831);
var defaults = __nccwpck_require__(8190);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __nccwpck_require__(8875);
axios.CancelToken = __nccwpck_require__(1587);
axios.isCancel = __nccwpck_require__(4057);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __nccwpck_require__(4850);

// Expose isAxiosError
axios.isAxiosError = __nccwpck_require__(650);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ 8875:
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 1587:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var Cancel = __nccwpck_require__(8875);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 4057:
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 8178:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);
var buildURL = __nccwpck_require__(646);
var InterceptorManager = __nccwpck_require__(3214);
var dispatchRequest = __nccwpck_require__(5062);
var mergeConfig = __nccwpck_require__(4831);
var validator = __nccwpck_require__(1632);

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 3214:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 1934:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var isAbsoluteURL = __nccwpck_require__(1301);
var combineURLs = __nccwpck_require__(7189);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ 5226:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var enhanceError = __nccwpck_require__(1516);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 5062:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);
var transformData = __nccwpck_require__(9812);
var isCancel = __nccwpck_require__(4057);
var defaults = __nccwpck_require__(8190);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 1516:
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ 4831:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ 3211:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var createError = __nccwpck_require__(5226);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 9812:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);
var defaults = __nccwpck_require__(8190);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ 8190:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);
var normalizeHeaderName = __nccwpck_require__(6240);
var enhanceError = __nccwpck_require__(1516);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __nccwpck_require__(3454);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __nccwpck_require__(8104);
  }
  return adapter;
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ 7065:
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 646:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 7189:
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 1545:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ 1301:
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 650:
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ 3608:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ 6240:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 6455:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(328);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 4850:
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 1632:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var pkg = __nccwpck_require__(8593);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ 328:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var bind = __nccwpck_require__(7065);

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ 1133:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __nccwpck_require__(9975)("follow-redirects");
    }
    catch (error) { /* */ }
    if (typeof debug !== "function") {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};


/***/ }),

/***/ 7707:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var url = __nccwpck_require__(7310);
var URL = url.URL;
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var Writable = (__nccwpck_require__(2781).Writable);
var assert = __nccwpck_require__(9491);
var debug = __nccwpck_require__(1133);

// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;

  // Destroys the socket on timeout
  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Stops a timeout from triggering
  function clearTimer() {
    // Clear the timeout
    if (self._timeout) {
      clearTimeout(self._timeout);
      self._timeout = null;
    }

    // Clean up all attached listeners
    self.removeListener("abort", clearTimer);
    self.removeListener("error", clearTimer);
    self.removeListener("response", clearTimer);
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!self.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Attach callback if passed
  if (callback) {
    this.on("timeout", callback);
  }

  // Start the timer if or when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  // Clean up on events
  this.on("socket", destroyOnTimeout);
  this.on("abort", clearTimer);
  this.on("error", clearTimer);
  this.on("response", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.slice(0, -1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.

  // If the response is not a redirect; return it as-is
  var location = response.headers.location;
  if (!location || this._options.followRedirects === false ||
      statusCode < 300 || statusCode >= 400) {
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
    return;
  }

  // The response is a redirect, so abort the current request
  abortRequest(this._currentRequest);
  // Discard the remainder of the response to avoid waiting for data
  response.destroy();

  // RFC7231§6.4: A client SHOULD detect and intervene
  // in cyclical redirections (i.e., "infinite" redirection loops).
  if (++this._redirectCount > this._options.maxRedirects) {
    this.emit("error", new TooManyRedirectsError());
    return;
  }

  // Store the request headers if applicable
  var requestHeaders;
  var beforeRedirect = this._options.beforeRedirect;
  if (beforeRedirect) {
    requestHeaders = Object.assign({
      // The Host header was set by nativeProtocol.request
      Host: response.req.getHeader("host"),
    }, this._options.headers);
  }

  // RFC7231§6.4: Automatic redirection needs to done with
  // care for methods not known to be safe, […]
  // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
  // the request method from POST to GET for the subsequent request.
  var method = this._options.method;
  if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
      // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
    this._options.method = "GET";
    // Drop a possible entity and headers related to it
    this._requestBodyBuffers = [];
    removeMatchingHeaders(/^content-/i, this._options.headers);
  }

  // Drop the Host header, as the redirect might lead to a different host
  var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

  // If the redirect is relative, carry over the host of the last request
  var currentUrlParts = url.parse(this._currentUrl);
  var currentHost = currentHostHeader || currentUrlParts.host;
  var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
    url.format(Object.assign(currentUrlParts, { host: currentHost }));

  // Determine the URL of the redirection
  var redirectUrl;
  try {
    redirectUrl = url.resolve(currentUrl, location);
  }
  catch (cause) {
    this.emit("error", new RedirectionError(cause));
    return;
  }

  // Create the redirected request
  debug("redirecting to", redirectUrl);
  this._isRedirect = true;
  var redirectUrlParts = url.parse(redirectUrl);
  Object.assign(this._options, redirectUrlParts);

  // Drop confidential headers when redirecting to a less secure protocol
  // or to a different domain that is not a superdomain
  if (redirectUrlParts.protocol !== currentUrlParts.protocol &&
     redirectUrlParts.protocol !== "https:" ||
     redirectUrlParts.host !== currentHost &&
     !isSubdomain(redirectUrlParts.host, currentHost)) {
    removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
  }

  // Evaluate the beforeRedirect callback
  if (typeof beforeRedirect === "function") {
    var responseDetails = {
      headers: response.headers,
      statusCode: statusCode,
    };
    var requestDetails = {
      url: currentUrl,
      method: method,
      headers: requestHeaders,
    };
    try {
      beforeRedirect(this._options, responseDetails, requestDetails);
    }
    catch (err) {
      this.emit("error", err);
      return;
    }
    this._sanitizeOptions(this._options);
  }

  // Perform the redirected request
  try {
    this._performRequest();
  }
  catch (cause) {
    this.emit("error", new RedirectionError(cause));
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return (lastValue === null || typeof lastValue === "undefined") ?
    undefined : String(lastValue).trim();
}

function createErrorType(code, defaultMessage) {
  function CustomError(cause) {
    Error.captureStackTrace(this, this.constructor);
    if (!cause) {
      this.message = defaultMessage;
    }
    else {
      this.message = defaultMessage + ": " + cause.message;
      this.cause = cause;
    }
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }
  request.on("error", noop);
  request.abort();
}

function isSubdomain(subdomain, domain) {
  const dot = subdomain.length - domain.length - 1;
  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ 4294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(4219);


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 9975:
/***/ ((module) => {

module.exports = eval("require")("debug");


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 8593:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"axios","version":"0.21.3","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(9496);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map