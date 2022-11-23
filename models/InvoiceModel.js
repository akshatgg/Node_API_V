const express = require('express');
const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
    dueDate: Date,
    currency: String,
    types:String,
    items: [ { itemName: String, unitPrice: String, quantity: String,hsn: String, discount: String } ],
    rates: String,
    extra:String,
    vat: Number,
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: [String],
    totalAmountReceived: Number,
    client: { name: String, email: String, phone: String, gst: String, address: String },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const InvoiceModel = mongoose.model('InvoiceModel', InvoiceSchema)
module.exports= InvoiceModel