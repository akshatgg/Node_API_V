// const { Invoice, UserProfile, UserBusinessProfile } = require('../models');
// const ApiError = require('../errors/ApiError');
// class InvoiceController {
//     createInvoice = async (req, res, next) => {
//         var token = req.header('authorization')
//         if (token) {
//             var payload = decodeToken(token)
//             // console.log("token ", token);
//             var invoice = new Invoice(req.body);
//             invoice.user_id = payload.id;
//             invoice.save().then((invoice) => {
//                 res.status(200).json({
//                     status: "success",
//                     message: "invoice created successfully",
//                     data: invoice
//                 });
//             }
//             ).catch((error) => {
//                 res.status(500).json({
//                     status: "error",
//                     message: "invoice not created",
//                     error: error
//                 });
//             }
//             );
//         } else {
//             res.status(403).json({
//                 status: "error",
//                 message: "token not found"
//             });
//         }
//     }
//     getInvoice = async (req, res, next) => {
//         var token = req.header('authorization')
//         if (token) {
//             var payload = decodeToken(token)
//             Invoice.findAll({
//                 where: {
//                     user_id: payload.id
//                 }
//             }).then((invoice) => {
//                 res.status(200).json({
//                     status: "success",
//                     message: "invoice fetched successfully",
//                     data: invoice
//                 });
//             }
//             ).catch((error) => {
//                 res.status(500).json({
//                     status: "error",
//                     message: "invoice not fetched",
//                     error: error
//                 });
//             }
//             );
//         } else {
//             res.status(403).json({
//                 status: "error",
//                 message: "token not found"
//             });
//         }
//     }
//     updateInvoice = async (req, res, next) => {
//         var token = req.header('authorization')
//         if (token) {
//             var payload = decodeToken(token)
//             Invoice.update(req.body, {
//                 where: {
//                     id: req.body.id
//                 }
//             }).then((invoice) => {
//                 res.status(200).json({
//                     status: "success",
//                     message: "invoice updated successfully",
//                     // data: invoice
//                 });
//             }
//             ).catch((error) => {
//                 res.status(500).json({
//                     status: "error",
//                     message: "invoice not updated",
//                     error: error
//                 });
//             }
//             );
//         } else {
//             res.status(403).json({
//                 status: "error",
//                 message: "token not found"
//             });
//         }
//     }
// }

// decodeToken = (token) => {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const buff = new Buffer(base64, 'base64');
//     const payloadinit = buff.toString('ascii');
//     const payload = JSON.parse(payloadinit);
//     return payload;
// }
// module.exports = new InvoiceController();