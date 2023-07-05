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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
// create bill
var BillPayableController = /** @class */ (function () {
    function BillPayableController() {
    }
    BillPayableController.createBillPayable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, supplierName, supplierAddress, contact, billNumber, billDate, billAmount, billDiscription, paymentAmount, paymentMethod, paymentDate, dueDate, comment, transactionId, tax, invoiceNumber, bill, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, supplierName = _a.supplierName, supplierAddress = _a.supplierAddress, contact = _a.contact, billNumber = _a.billNumber, billDate = _a.billDate, billAmount = _a.billAmount, billDiscription = _a.billDiscription, paymentAmount = _a.paymentAmount, paymentMethod = _a.paymentMethod, paymentDate = _a.paymentDate, dueDate = _a.dueDate, comment = _a.comment, transactionId = _a.transactionId, tax = _a.tax, invoiceNumber = _a.invoiceNumber;
                        if (!billNumber || !supplierName || !billDate || !contact || !billAmount || !billDiscription ||
                            !paymentMethod || !paymentAmount || !paymentDate || !dueDate || !tax || !supplierAddress) {
                            res.status(400).send({ success: false, message: "plz provide all require body fields" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.billpayable.create({
                                data: {
                                    supplierName: supplierName,
                                    supplierAddress: supplierAddress,
                                    contact: contact,
                                    billNumber: billNumber,
                                    billDate: billDate,
                                    billAmount: billAmount,
                                    billDiscription: billDiscription,
                                    paymentAmount: paymentAmount,
                                    paymentMethod: paymentMethod,
                                    paymentDate: paymentDate,
                                    dueDate: dueDate,
                                    comment: comment,
                                    transactionId: transactionId,
                                    tax: tax,
                                    invoiceNumber: invoiceNumber
                                },
                            })];
                    case 1:
                        bill = _b.sent();
                        res.status(201).json({ message: 'Bill payable added successfully', result: bill });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        //console.log(error)
                        res.status(500).json({ success: false, message: 'Internal server error', errors: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // find All library
    BillPayableController.findAllBillPayable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var AllBillPayable, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.prisma.billrecieve.findMany({})];
                    case 1:
                        AllBillPayable = _a.sent();
                        res.status(200).json({ success: true, AllBillPayable: AllBillPayable });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal server error', errors: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get library by id
    BillPayableController.findOneBillPayable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, OneBill, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, index_1.prisma.billpayable.findFirst({
                                where: {
                                    id: id,
                                },
                            })];
                    case 1:
                        OneBill = _a.sent();
                        if (!OneBill) {
                            res.status(404).json({ success: false, message: 'bill  payable not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json(OneBill);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //bill update by id
    BillPayableController.updateBill = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, supplierName, supplierAddress, contact, billNumber, billDate, billAmount, billDiscription, paymentAmount, paymentMethod, paymentDate, dueDate, comment, transactionId, tax, invoiceNumber, updatedBill, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = parseInt(req.params.id);
                        _a = req.body, supplierName = _a.supplierName, supplierAddress = _a.supplierAddress, contact = _a.contact, billNumber = _a.billNumber, billDate = _a.billDate, billAmount = _a.billAmount, billDiscription = _a.billDiscription, paymentAmount = _a.paymentAmount, paymentMethod = _a.paymentMethod, paymentDate = _a.paymentDate, dueDate = _a.dueDate, comment = _a.comment, transactionId = _a.transactionId, tax = _a.tax, invoiceNumber = _a.invoiceNumber;
                        return [4 /*yield*/, index_1.prisma.billpayable.update({
                                where: { id: id },
                                data: {
                                    supplierName: supplierName,
                                    supplierAddress: supplierAddress,
                                    contact: contact,
                                    billNumber: billNumber,
                                    billDate: billDate,
                                    billAmount: billAmount,
                                    billDiscription: billDiscription,
                                    paymentAmount: paymentAmount,
                                    paymentMethod: paymentMethod,
                                    paymentDate: paymentDate,
                                    dueDate: dueDate,
                                    comment: comment,
                                    transactionId: transactionId,
                                    tax: tax,
                                    invoiceNumber: invoiceNumber
                                }
                            })];
                    case 1:
                        updatedBill = _b.sent();
                        if (!updatedBill) {
                            res.status(404).json({ sucess: false, message: 'bill not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json({ sucess: true, updatedBill: updatedBill });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error(error_4);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete library by id
    BillPayableController.deleteBill = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var Id, deletedBill, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        Id = parseInt(req.params.id);
                        return [4 /*yield*/, index_1.prisma.billpayable.delete({ where: { id: Id } })];
                    case 1:
                        deletedBill = _a.sent();
                        if (!deletedBill) {
                            res.status(404).json({ success: false, message: 'bill  not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json({ success: true, deletedBill: deletedBill });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BillPayableController;
}());
exports.default = BillPayableController;
//# sourceMappingURL=billpayable.controller.js.map