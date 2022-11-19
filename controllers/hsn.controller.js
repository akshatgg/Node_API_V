const { Hsn } = require('../models');
const uuid = require('uuid');
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require("sequelize");
const ApiError = require('../errors/ApiError');

class HsnController {
  getHsnCode = async (req, res, next) => {
    var token = req.header('authorization')
    var payload = decodeToken(token)
    Hsn.findOne({
        include: [{
            model: Hsn,
            where: { id: payload.id }
        }]
    }).then((result) => {
        console.log(result["dataValues"].User["dataValues"]);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "hsn code",
                data: {
                    id: result['dataValues']['id'],
                    hsn_code: result['dataValues']['hsn_code'],
                    description: result['dataValues']['description'],
                   

                }
            })
        } else {
            return next(ApiError.badRequest("failed to get hsn code"))
        }
    }).catch((error) => {
        console.log(`catch block ${error}`)
        if (error)
            return next(ApiError.conflict(error));
        else
            return next(ApiError.internalServerError(error))
    });
 }

}


module.exports = new HsnController();