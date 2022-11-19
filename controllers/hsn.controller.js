const { Hsn } = require('../models');
const { Sac } = require('../models');
const uuid = require('uuid');
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require("sequelize");
const ApiError = require('../errors/ApiError');

class HsnController {
  getHsnCode = async (req, res, next) => {
    //var token = req.header('authorization')
   // var payload = decodeToken(token)
   console.log(req.query.id);
   console.log(req.body.id);
    Hsn.findOne({
        

        
            where: { id: req.body.id }
        
    }).then((result) => {
       // console.log(result["dataValues"].User["dataValues"]);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "hsn code",
                data: result
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

 getSacCode = async (req, res, next) => {
    //var token = req.header('authorization')
   // var payload = decodeToken(token)
   console.log(req.query.id);
   console.log(req.body.id);
    Sac.findOne({
        

        
            where: { id: req.body.id }
        
    }).then((result) => {
       // console.log(result["dataValues"].User["dataValues"]);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Sac code",
                data: result
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