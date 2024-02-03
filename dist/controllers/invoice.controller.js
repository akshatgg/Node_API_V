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
var client_1 = require("@prisma/client");
var index_1 = require("../index");
var InvoiceController = /** @class */ (function () {
    function InvoiceController() {
    }
    InvoiceController.summary = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userId, totalSales, totalPurchases, numberOfParties, numberOfItems, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.invoice.aggregate({
                                where: {
                                    userId: userId,
                                    type: { in: ['sales', 'sales_return'] },
                                },
                                _sum: {
                                    totalAmount: true,
                                },
                            })];
                    case 1:
                        totalSales = _c.sent();
                        return [4 /*yield*/, index_1.prisma.invoice.aggregate({
                                where: {
                                    userId: userId,
                                    type: { in: ['purchase', 'purchase_return'] },
                                },
                                _sum: {
                                    totalAmount: true,
                                },
                            })];
                    case 2:
                        totalPurchases = _c.sent();
                        return [4 /*yield*/, index_1.prisma.party.count({
                                where: {
                                    userId: userId,
                                },
                            })];
                    case 3:
                        numberOfParties = _c.sent();
                        return [4 /*yield*/, index_1.prisma.item.count({
                                where: {
                                    userId: userId,
                                },
                            })];
                    case 4:
                        numberOfItems = _c.sent();
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                summary: {
                                    total_sales: (_a = totalSales._sum.totalAmount) !== null && _a !== void 0 ? _a : 0,
                                    total_purchases: (_b = totalPurchases._sum.totalAmount) !== null && _b !== void 0 ? _b : 0,
                                    number_of_parties: numberOfParties,
                                    number_of_items: numberOfItems,
                                },
                            })];
                    case 5:
                        error_1 = _c.sent();
                        console.error(error_1);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, invoiceNumber, gstNumber, type, partyId, itemId, totalAmount, totalGst, stateOfSupply, cgst, sgst, igst, utgst, details, extraDetails, invoiceItems, modeOfPayment, _b, credit, status, party, gstRegex, formattedInvoiceItems, invoiceData, invoice;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userId = req.user.id;
                        _a = req.body, invoiceNumber = _a.invoiceNumber, gstNumber = _a.gstNumber, type = _a.type, partyId = _a.partyId, itemId = _a.itemId, totalAmount = _a.totalAmount, totalGst = _a.totalGst, stateOfSupply = _a.stateOfSupply, cgst = _a.cgst, sgst = _a.sgst, igst = _a.igst, utgst = _a.utgst, details = _a.details, extraDetails = _a.extraDetails, invoiceItems = _a.invoiceItems, modeOfPayment = _a.modeOfPayment, _b = _a.credit, credit = _b === void 0 ? false : _b, status = _a.status;
                        if (!partyId) return [3 /*break*/, 2];
                        return [4 /*yield*/, index_1.prisma.party.findUnique({ where: { id: partyId } })];
                    case 1:
                        party = _c.sent();
                        if (!party) {
                            return [2 /*return*/, res.status(401).json({ success: false, message: 'Party not found' })];
                        }
                        _c.label = 2;
                    case 2:
                        gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
                        if (!gstRegex.test(gstNumber)) {
                            return [2 /*return*/, res.status(400).json({ error: 'Invalid GST number' })];
                        }
                        formattedInvoiceItems = invoiceItems
                            ? invoiceItems.map(function (_a) {
                                var itemId = _a.itemId, quantity = _a.quantity, discount = _a.discount;
                                return ({
                                    item: {
                                        connect: {
                                            id: itemId,
                                        },
                                    },
                                    quantity: quantity,
                                    discount: discount,
                                });
                            })
                            : [];
                        invoiceData = {
                            invoiceNumber: invoiceNumber,
                            gstNumber: gstNumber,
                            type: type,
                            party: {
                                connect: { id: partyId },
                            },
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
                            status: status,
                            invoiceItems: {
                                create: formattedInvoiceItems,
                            },
                            user: {
                                connect: { id: userId },
                            },
                        };
                        return [4 /*yield*/, index_1.prisma.invoice.create({
                                data: invoiceData,
                                include: {
                                    invoiceItems: {
                                        include: {
                                            item: true,
                                        },
                                    },
                                },
                            })];
                    case 3:
                        invoice = _c.sent();
                        return [2 /*return*/, res.status(201).json(invoice)];
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
                                include: {
                                    invoiceItems: {
                                        include: {
                                            item: true,
                                        },
                                    },
                                },
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
                        return [4 /*yield*/, index_1.prisma.invoice.findUnique({
                                where: { id: invoiceId },
                                include: {
                                    invoiceItems: {
                                        include: {
                                            item: true,
                                        },
                                    },
                                },
                            })];
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
            var invoiceId, _a, invoiceNumber, gstNumber, type, partyId, totalAmount, totalGst, stateOfSupply, cgst, sgst, igst, utgst, details, extraDetails, items, status, userId, invoice, updatedInvoice, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        invoiceId = req.params.id;
                        _a = req.body, invoiceNumber = _a.invoiceNumber, gstNumber = _a.gstNumber, type = _a.type, partyId = _a.partyId, totalAmount = _a.totalAmount, totalGst = _a.totalGst, stateOfSupply = _a.stateOfSupply, cgst = _a.cgst, sgst = _a.sgst, igst = _a.igst, utgst = _a.utgst, details = _a.details, extraDetails = _a.extraDetails, items = _a.items, status = _a.status;
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
                                    gstNumber: gstNumber,
                                    type: type,
                                    partyId: partyId,
                                    totalAmount: totalAmount,
                                    totalGst: totalGst,
                                    stateOfSupply: stateOfSupply,
                                    cgst: cgst,
                                    sgst: sgst,
                                    igst: igst,
                                    utgst: utgst,
                                    details: details,
                                    extraDetails: extraDetails,
                                    status: status,
                                    invoiceItems: {
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
                        _a.trys.push([0, 4, , 5]);
                        invoiceId = req.params.id;
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.invoice.findFirst({ where: { id: invoiceId, userId: userId } })];
                    case 1:
                        invoice = _a.sent();
                        if (!invoice) {
                            return [2 /*return*/, res.status(200).json({ success: false, message: 'Invoice not found' })];
                        }
                        return [4 /*yield*/, index_1.prisma.invoiceItem.deleteMany({ where: { invoiceId: invoiceId } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, index_1.prisma.invoice.delete({ where: { id: invoiceId } })];
                    case 3:
                        deletedInvoice = _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, deletedInvoice: deletedInvoice })];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.createParty = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, date, currentYear, currentMonth, _a, partyName, type, gstin, pan, tan, upi, email, phone, address, bankName, bankAccountNumber, bankIfsc, bankBranch, openingBalance, _b, year, _c, month, party, error_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        date = new Date();
                        currentYear = date.getFullYear();
                        currentMonth = date.getMonth();
                        _a = req.body, partyName = _a.partyName, type = _a.type, gstin = _a.gstin, pan = _a.pan, tan = _a.tan, upi = _a.upi, email = _a.email, phone = _a.phone, address = _a.address, bankName = _a.bankName, bankAccountNumber = _a.bankAccountNumber, bankIfsc = _a.bankIfsc, bankBranch = _a.bankBranch, openingBalance = _a.openingBalance, _b = _a.year, year = _b === void 0 ? currentYear : _b, _c = _a.month, month = _c === void 0 ? currentMonth : _c;
                        return [4 /*yield*/, index_1.prisma.party.create({
                                data: {
                                    partyName: partyName,
                                    type: type,
                                    gstin: gstin,
                                    pan: pan,
                                    tan: tan,
                                    upi: upi,
                                    email: email,
                                    phone: phone,
                                    address: address,
                                    bankName: bankName,
                                    bankAccountNumber: bankAccountNumber,
                                    bankIfsc: bankIfsc,
                                    bankBranch: bankBranch,
                                    userId: userId,
                                    ledgers: {
                                        create: {
                                            ledgerName: partyName,
                                            ledgerType: type === client_1.PartyType.customer ? client_1.LedgerType.accountsReceivable : client_1.LedgerType.accountsPayable,
                                            openingBalance: openingBalance,
                                            year: year,
                                            month: month,
                                            userId: userId,
                                        },
                                    },
                                },
                                include: {
                                    ledgers: true
                                }
                            })];
                    case 1:
                        party = _d.sent();
                        return [2 /*return*/, res.status(201).json({ success: true, party: party })];
                    case 2:
                        error_6 = _d.sent();
                        console.log(error_6);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
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
                        return [4 /*yield*/, index_1.prisma.party.findFirst({ where: { id: partyId, userId: userId } })];
                    case 1:
                        party = _a.sent();
                        if (!party) {
                            return [2 /*return*/, res.status(200).json({ success: false, message: 'Party not found' })];
                        }
                        return [4 /*yield*/, index_1.prisma.party.delete({ where: { id: partyId } })];
                    case 2:
                        deletedParty = _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, deletedParty: deletedParty })];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.createItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, itemName, unit, price, openingStock, closingStock, purchasePrice, gst, taxExempted, description, hsnCode, categoryId, supplierId, item, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.body, itemName = _a.itemName, unit = _a.unit, price = _a.price, openingStock = _a.openingStock, closingStock = _a.closingStock, purchasePrice = _a.purchasePrice, gst = _a.gst, taxExempted = _a.taxExempted, description = _a.description, hsnCode = _a.hsnCode, categoryId = _a.categoryId, supplierId = _a.supplierId;
                        return [4 /*yield*/, index_1.prisma.item.create({
                                data: {
                                    itemName: itemName,
                                    unit: unit,
                                    price: price,
                                    openingStock: openingStock,
                                    closingStock: closingStock,
                                    purchasePrice: purchasePrice,
                                    gst: gst,
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
                        return [2 /*return*/, res.status(201).json({ success: true, item: item })];
                    case 2:
                        error_8 = _b.sent();
                        console.log(error_8);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.updateItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, itemName, userId, item, updatedItem, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        itemId = req.params.id;
                        itemName = req.body.itemName;
                        userId = req.user.id;
                        return [4 /*yield*/, index_1.prisma.item.findFirst({ where: { id: itemId, userId: userId } })];
                    case 1:
                        item = _a.sent();
                        if (!item) {
                            res.status(200).json({ success: false, message: 'Item not found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, index_1.prisma.item.update({
                                where: { id: itemId },
                                data: {
                                    itemName: itemName
                                }
                            })];
                    case 2:
                        updatedItem = _a.sent();
                        console.log("updateItem");
                        console.log(updatedItem);
                        res.status(200).json({ sucess: true, item: updatedItem });
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        res.status(500).json({ sucess: false, message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.deleteItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, userId, item, deletedItem, error_10;
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
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Item does not exists.' })];
                        }
                        return [4 /*yield*/, index_1.prisma.item.delete({ where: { id: itemId } })];
                    case 2:
                        deletedItem = _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, deletedItem: deletedItem })];
                    case 3:
                        error_10 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getAllParties = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, _b, page, _c, limit, search, parsedPage, parsedLimit, offset, where, regEx, searchString, parties, error_11;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, search = _a.search;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        where = void 0;
                        if (search == undefined)
                            where = { userId: userId };
                        else {
                            regEx = new RegExp('^[0-9a-zA-Z]+$');
                            searchString = search.toString();
                            if (searchString.length > 3 && regEx.test(searchString)) {
                                where = {
                                    userId: userId,
                                    partyName: {
                                        search: "*" + search + "*"
                                    }
                                };
                            }
                            else
                                return [2 /*return*/, res.status(200).json({ success: true, parties: [] })];
                        }
                        return [4 /*yield*/, index_1.prisma.party.findMany({
                                where: where,
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 1:
                        parties = _d.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, parties: parties })];
                    case 2:
                        error_11 = _d.sent();
                        console.log(error_11);
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getPartyById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, partyId, party, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        partyId = req.params.id;
                        return [4 /*yield*/, index_1.prisma.party.findFirst({
                                where: { id: partyId, userId: userId }, include: {
                                    ledgers: true
                                }
                            })];
                    case 1:
                        party = _a.sent();
                        if (!party) {
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Party not found' })];
                        }
                        return [2 /*return*/, res.status(200).json({ success: true, party: party })];
                    case 2:
                        error_12 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getAllItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, _b, page, _c, limit, search, parsedPage, parsedLimit, offset, where, regEx, searchString, items, error_13;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, search = _a.search;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        where = void 0;
                        if (search == undefined)
                            where = { userId: userId };
                        else {
                            regEx = new RegExp('^[0-9a-zA-Z]+$');
                            searchString = search.toString();
                            if (searchString.length > 3 && regEx.test(searchString)) {
                                where = {
                                    userId: userId,
                                    itemName: {
                                        search: "*" + search + "*"
                                    }
                                };
                            }
                            else
                                return [2 /*return*/, res.status(200).json({ success: true, parties: [] })];
                        }
                        return [4 /*yield*/, index_1.prisma.item.findMany({
                                where: where,
                                skip: offset,
                                take: parsedLimit,
                            })];
                    case 1:
                        items = _d.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, items: items })];
                    case 2:
                        error_13 = _d.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceController.getItemById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, itemId, item, error_14;
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
                            return [2 /*return*/, res.status(404).json({ success: false, message: 'Item not found' })];
                        }
                        return [2 /*return*/, res.status(200).json({ success: true, item: item })];
                    case 2:
                        error_14 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InvoiceController;
}());
exports.default = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map