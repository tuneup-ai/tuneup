var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var baseUrl = "https://api.tuneup.cc";
var createHeaders = function (apiKey) { return ({
    'api-key': apiKey,
    'Content-Type': 'application/json'
}); };
var sleep = function (ms) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
    });
}); };
export var createClient = function (apiKey) {
    var create = function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var body, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = JSON.stringify(params);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/v1/fragments"), {
                            method: 'POST',
                            headers: createHeaders(apiKey),
                            body: body
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    var read = function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(baseUrl, "/v1/fragments/").concat(uuid), {
                        headers: createHeaders(apiKey),
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    var polling = function (fragmentId, onReceiveContent, onCompleted) { return __awaiter(void 0, void 0, void 0, function () {
        var data, output, output;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, read(fragmentId)];
                case 1:
                    data = _e.sent();
                    _e.label = 2;
                case 2:
                    if (!((_a = data === null || data === void 0 ? void 0 : data.fragment) === null || _a === void 0 ? void 0 : _a.updatingFrom)) return [3 /*break*/, 5];
                    return [4 /*yield*/, sleep(1000)];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, read(fragmentId)];
                case 4:
                    data = _e.sent();
                    output = (_b = data === null || data === void 0 ? void 0 : data.fragment) === null || _b === void 0 ? void 0 : _b.output;
                    onReceiveContent(output || '');
                    return [3 /*break*/, 2];
                case 5:
                    if (!((_c = data === null || data === void 0 ? void 0 : data.fragment) === null || _c === void 0 ? void 0 : _c.updatingFrom)) {
                        output = ((_d = data === null || data === void 0 ? void 0 : data.fragment) === null || _d === void 0 ? void 0 : _d.output) || '';
                        onReceiveContent(output);
                        onCompleted && onCompleted(output);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var ask = function (_a) {
        var question = _a.question, onReceiveContent = _a.onReceiveContent, onCompleted = _a.onCompleted, collectionId = _a.collectionId, _b = _a.model, model = _b === void 0 ? 'gpt-3.5-turbo' : _b;
        return __awaiter(void 0, void 0, void 0, function () {
            var data, id;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, create({
                            input: question,
                            model: model,
                            collectionId: collectionId,
                        })];
                    case 1:
                        data = _d.sent();
                        id = (_c = data.fragment) === null || _c === void 0 ? void 0 : _c.id;
                        if (!id) {
                            console.log('id not found');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, polling(id, onReceiveContent, onCompleted)];
                    case 2:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return {
        ask: ask,
        fragments: {
            create: create,
            read: read,
            polling: polling,
        },
    };
};
