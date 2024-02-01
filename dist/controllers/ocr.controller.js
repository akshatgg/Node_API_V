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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var process_1 = require("process");
var tesseract_js_1 = __importDefault(require("tesseract.js"));
var sharp_1 = __importDefault(require("sharp"));
var tessDataPath = (0, path_1.join)((0, process_1.cwd)(), 'data');
var TESSERACT_CONFIG = {
    tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    tessdata: tessDataPath,
    psm: tesseract_js_1.default.PSM.SINGLE_LINE
};
var PAN_PATTERN = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/;
var DOB_PATTERN = /\b\d{2}\/\d{2}\/\d{4}\b/;
var NAME_RGX = /\bName\b/i;
var NAME_EXT_RGX = /([A-Z]{2,})(?:\s+[A-Z]{1,}){0,2}/;
var FATHER_NAME_RGX = /\bFather's Name\b/i;
function extractPanDetails(lines) {
    var extractedInfo = {
        name: "",
        fatherName: "",
        dob: "",
        pan: ""
    };
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var dobMatch = line.match(DOB_PATTERN);
        if (FATHER_NAME_RGX.test(line)) {
            extractedInfo.fatherName = lines[i + 1].match(NAME_EXT_RGX)[0];
        }
        else if (NAME_RGX.test(line)) {
            extractedInfo.name = lines[i + 1].match(NAME_EXT_RGX)[0];
        }
        else if (dobMatch) {
            extractedInfo.dob = dobMatch[0];
        }
        else {
            var panMatch = line.match(PAN_PATTERN);
            if (panMatch) {
                extractedInfo.pan = panMatch[0];
            }
        }
    }
    return extractedInfo;
}
var OcrController = /** @class */ (function () {
    function OcrController() {
    }
    //  static async  UploadpanOCR(req: Request, res: Response) {
    //   try {
    //     const panLocalPath =  req?.file?.path;
    //     if (!panLocalPath) {
    //       return res.status(400).json({ message: 'PAN card image not provided' });
    //     }
    //     const panImage = await uploadOnCloudinary(panLocalPath);
    //     if (!panImage?.url) {
    //       return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
    //     }
    //     console.log('Cloudinary URL:', panImage?.url);
    //     const options = {
    //       method: 'POST',
    //       url: 'https://india-pan-card-ocr.p.rapidapi.com/v3/tasks/sync/extract/ind_pan',
    //       headers: {
    //         'content-type': 'application/json',
    //         'X-RapidAPI-Key': '8645245108msh6e1a703464669a8p1b2dcbjsn88ae327b7073',
    //         'X-RapidAPI-Host': 'india-pan-card-ocr.p.rapidapi.com'
    //       },
    //       data: {
    //         task_id:125,
    //         group_id: 125,
    //         data: {
    //           document1: panImage?.url
    //         }
    //       }
    //     };
    //     const response = await axios.request(options);
    //     console.log("RES",response);
    //     return res.status(201).json({ message: 'Successfully fetched data', data: response.data });
    //   } catch (error) {
    //     return res.status(500).json({ message: 'Internal server error' });
    //   }
    // }
    //   static async Getuploadpandata (req: Request, res: Response){
    //     const requestId= req.params.id
    //     const options = {
    //      method: 'GET',
    //      url: 'https://india-pan-card-ocr.p.rapidapi.com/v3/tasks',
    //       params: {
    //       request_id: requestId
    //     },
    //     headers: {
    //       'X-RapidAPI-Key': '8645245108msh6e1a703464669a8p1b2dcbjsn88ae327b7073',
    //       'X-RapidAPI-Host': 'india-pan-card-ocr.p.rapidapi.com'
    //     }
    // };
    //    try {
    // 	const response = await axios.request(options);
    //     return res.status(200).json({success:true,message:"Successfully fetched data",data:response.data});
    //    } catch (error) {
    //     return res.status(200).json({success: false, message:"internal error", error}); 
    //    }
    //     }
    OcrController.getpandata = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var image, outputBuffer, result, lines, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        image = (0, sharp_1.default)(req.file.path);
                        return [4 /*yield*/, image
                                .greyscale()
                                .linear(1.0, -25)
                                .toBuffer()];
                    case 1:
                        outputBuffer = _a.sent();
                        return [4 /*yield*/, tesseract_js_1.default
                                .recognize(outputBuffer, 'eng', TESSERACT_CONFIG)];
                    case 2:
                        result = _a.sent();
                        lines = result.data.text
                            .split('\n')
                            .map(function (line) { return line.trim(); })
                            .filter(function (line) { return line; });
                        data = extractPanDetails(lines);
                        if (data.name === "" || data.pan === "") {
                            return [2 /*return*/, res.status(404)
                                    .json({ message: "faild to extract data or  upload a valid pan card " })];
                        }
                        return [2 /*return*/, res.status(200)
                                .send({ status: 'success', data: data })];
                    case 3:
                        e_1 = _a.sent();
                        res.status(500).send({
                            status: 'failure',
                            message: 'Something went wrong',
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OcrController;
}());
exports.default = OcrController;
//# sourceMappingURL=ocr.controller.js.map