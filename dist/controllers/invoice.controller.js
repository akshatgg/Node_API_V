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
var InvoiceController = /** @class */ (function () {
    function InvoiceController() {
    }
    InvoiceController.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, invoiceNumber, type, partyId, phone, partyName, totalAmount, totalGst, stateOfSupply, cgst, sgst, igst, utgst, details, extraDetails, items, modeOfPayment, _b, credit, party, invoice, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        userId = req.user.id;
                        _a = req.body, invoiceNumber = _a.invoiceNumber, type = _a.type, partyId = _a.partyId, phone = _a.phone, partyName = _a.partyName, totalAmount = _a.totalAmount, totalGst = _a.totalGst, stateOfSupply = _a.stateOfSupply, cgst = _a.cgst, sgst = _a.sgst, igst = _a.igst, utgst = _a.utgst, details = _a.details, extraDetails = _a.extraDetails, items = _a.items, modeOfPayment = _a.modeOfPayment, _b = _a.credit, credit = _b === void 0 ? false : _b;
                        if (!partyId) return [3 /*break*/, 2];
                        return [4 /*yield*/, index_1.prisma.party.findUnique({ where: { id: partyId } })];
                    case 1:
                        party = _c.sent();
                        if (!party) {
                            return [2 /*return*/, res.status(401).json({ sucess: false, message: 'Party not found' })];
                        }
                        _c.label = 2;
                    case 2: return [4 /*yield*/, index_1.prisma.invoice.create({
                            data: {
                                invoiceNumber: invoiceNumber,
                                type: type,
                                party: {
                                    connect: { id: partyId } // Connect an existing party by ID
                                },
                                phone: phone,
                                partyName: partyName,
                                totalAmount: totalAmount,
                                totalGst: totalGst,
                                stateOfSupply: stateOfSupply,
                                cgst: cgst,
                                sgst: sgst,
                                igst: igst,
                                utgst: utgst,
                                details: details,
                                extraDetails: extraDetails,
                                modeOfPayment: modeOfPayment,
                                credit: credit,
                                items: {
                                    create: items.map(function (_a) {
                                        var id = _a.id, quantity = _a.quantity;
                                        return ({
                                            item: { connect: { id: id } },
                                            quantity: quantity
                                        });
                                    }),
                                },
                                user: {
                                    connect: { id: userId } // Connect the user by ID
                                },
                            },
                        })];
                    case 3:
                        invoice = _c.sent();
                        return [2 /*return*/, res.status(201).json(invoice)];
                    case 4:
                        error_1 = _c.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(500).json({ sucess: false, message: 'Internal server error' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, invoices, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, index_1.prisma.invoice.findMany({
                                where: { userId: userId },
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 1:
                        invoices = _d.sent();
                        res.status(200).json({ success: true, invoices: invoices });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _d.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var invoiceId, invoice, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        invoiceId = req.params.id;
                        return [4 /*yield*/, index_1.prisma.invoice.findUnique({ where: { id: invoiceId } })];
                    case 1:
                        invoice = _a.sent();
                        if (!invoice) {
                            res.status(404).json({ sucess: false, message: 'Invoice not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json(invoice);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({ sucess: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var invoiceId, _a, invoiceNumber, type, partyId, phone, partyName, totalAmount, totalGst, stateOfSupply, cgst, sgst, igst, utgst, details, extraDetails, items, userId, invoice, updatedInvoice, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        invoiceId = req.params.id;
                        _a = req.body, invoiceNumber = _a.invoiceNumber, type = _a.type, partyId = _a.partyId, phone = _a.phone, partyName = _a.partyName, totalAmount = _a.totalAmount, totalGst = _a.totalGst, stateOfSupply = _a.stateOfSupply, cgst = _a.cgst, sgst = _a.sgst, igst = _a.igst, utgst = _a.utgst, details = _a.details, extraDetails = _a.extraDetails, items = _a.items;
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.invoice.findFirst({ where: { id: invoiceId, userId: userId } })];
                    case 1:
                        invoice = _b.sent();
                        if (!invoice) {
                            res.status(200).json({ success: false, message: 'Invoice not found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.invoice.update({
                                where: { id: invoiceId },
                                data: {
                                    invoiceNumber: invoiceNumber,
                                    type: type,
                                    partyId: partyId,
                                    phone: phone,
                                    partyName: partyName,
                                    totalAmount: totalAmount,
                                    totalGst: totalGst,
                                    stateOfSupply: stateOfSupply,
                                    cgst: cgst,
                                    sgst: sgst,
                                    igst: igst,
                                    utgst: utgst,
                                    details: details,
                                    extraDetails: extraDetails,
                                    items: {
                                        upsert: items.map(function (item) { return ({
                                            where: { id: item.id },
                                            create: item,
                                            update: item,
                                        }); }),
                                    },
                                },
                            })];
                    case 2:
                        updatedInvoice = _b.sent();
                        res.status(200).json({ sucess: true, updatedInvoice: updatedInvoice });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        res.status(500).json({ sucess: false, message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var invoiceId, userId, invoice, deletedInvoice, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        invoiceId = req.params.id;
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.invoice.findFirst({ where: { id: invoiceId, userId: userId } })];
                    case 1:
                        invoice = _a.sent();
                        if (!invoice) {
                            res.status(200).json({ success: false, message: 'Invoice not found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.invoice.delete({ where: { id: invoiceId } })];
                    case 2:
                        deletedInvoice = _a.sent();
                        res.status(200).json({ success: true, deletedInvoice: deletedInvoice });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.createParty = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, partyName, type, gstin, pan, tan, upi, email, phone, address, bankName, bankAccountNumber, bankIfsc, bankBranch, party, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.body, partyName = _a.partyName, type = _a.type, gstin = _a.gstin, pan = _a.pan, tan = _a.tan, upi = _a.upi, email = _a.email, phone = _a.phone, address = _a.address, bankName = _a.bankName, bankAccountNumber = _a.bankAccountNumber, bankIfsc = _a.bankIfsc, bankBranch = _a.bankBranch;
                        return [4 /*yield*/, index_1.prisma.party.create({
                                data: {
                                    partyName: partyName,
                                    type: type,
                                    gstin: gstin,
                                    pan: pan,
                                    tan: tan,
                                    upi: upi,
                                    userId: userId,
                                    email: email,
                                    phone: phone,
                                    address: address,
                                    bankName: bankName,
                                    bankAccountNumber: bankAccountNumber,
                                    bankIfsc: bankIfsc,
                                    bankBranch: bankBranch,
                                },
                            })];
                    case 1:
                        party = _b.sent();
                        res.status(201).json({ success: true, party: party });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.deleteParty = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var partyId, userId, party, deletedParty, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        partyId = req.params.id;
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.invoice.findFirst({ where: { id: partyId, userId: userId } })];
                    case 1:
                        party = _a.sent();
                        if (!party) {
                            res.status(200).json({ success: false, message: 'Party not found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.party.delete({ where: { id: partyId } })];
                    case 2:
                        deletedParty = _a.sent();
                        res.status(200).json({ success: true, deletedParty: deletedParty });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.createItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, itemName, unit, price, openingStock, closingStock, purchasePrice, cgst, sgst, igst, utgst, taxExempted, description, hsnCode, categoryId, supplierId, item, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.body, itemName = _a.itemName, unit = _a.unit, price = _a.price, openingStock = _a.openingStock, closingStock = _a.closingStock, purchasePrice = _a.purchasePrice, cgst = _a.cgst, sgst = _a.sgst, igst = _a.igst, utgst = _a.utgst, taxExempted = _a.taxExempted, description = _a.description, hsnCode = _a.hsnCode, categoryId = _a.categoryId, supplierId = _a.supplierId;
                        return [4 /*yield*/, index_1.prisma.item.create({
                                data: {
                                    itemName: itemName,
                                    unit: unit,
                                    price: price,
                                    openingStock: openingStock,
                                    closingStock: closingStock,
                                    purchasePrice: purchasePrice,
                                    cgst: cgst,
                                    sgst: sgst,
                                    igst: igst,
                                    utgst: utgst,
                                    userId: userId,
                                    taxExempted: taxExempted,
                                    description: description,
                                    hsnCode: hsnCode,
                                    categoryId: categoryId,
                                    supplierId: supplierId,
                                },
                            })];
                    case 1:
                        item = _b.sent();
                        res.status(201).json({ success: true, item: item });
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _b.sent();
                        console.log(error_8);
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.deleteItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, userId, item, deletedItem, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        itemId = req.params.id;
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.item.findFirst({ where: { id: itemId, userId: userId } })];
                    case 1:
                        item = _a.sent();
                        if (!item) {
                            res.status(404).json({ success: false, message: 'Item does not exists.' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.item.delete({ where: { id: itemId } })];
                    case 2:
                        deletedItem = _a.sent();
                        res.status(200).json({ success: true, deletedItem: deletedItem });
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getAllParties = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, parties, error_10;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, index_1.prisma.party.findMany({
                                where: { userId: userId },
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 1:
                        parties = _d.sent();
                        res.status(200).json({ success: true, parties: parties });
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _d.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getPartyById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, partyId, party, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        partyId = req.params.id;
                        return [4 /*yield*/, index_1.prisma.party.findFirst({ where: { id: partyId, userId: userId } })];
                    case 1:
                        party = _a.sent();
                        if (!party) {
                            res.status(404).json({ success: false, message: 'Party not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json({ success: true, party: party });
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getAllItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, items, error_12;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, index_1.prisma.item.findMany({
                                where: { userId: userId },
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 1:
                        items = _d.sent();
                        res.status(200).json({ success: true, items: items });
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _d.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getItemById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, itemId, item, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        itemId = req.params.id;
                        return [4 /*yield*/, index_1.prisma.item.findFirst({ where: { id: itemId, userId: userId } })];
                    case 1:
                        item = _a.sent();
                        if (!item) {
                            res.status(404).json({ success: false, message: 'Item not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).json({ success: true, item: item });
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InvoiceController;
}());
exports.default = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map