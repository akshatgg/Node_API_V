const { User } = require('../models');
const uuid = require('uuid');
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const ApiError = require('../errors/ApiError')

class UserController {
    create = async (req, res, next) => {
        console.log(req.body);
        if (req.body.email === undefined) {
            return next(ApiError.badRequest("please enter email address"));
        }

        if (req.body.password === undefined) {
            return next(ApiError.badRequest("please enter password"));
        }

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email) !== true) {
            next(ApiError.badRequest("please enter valid email"))
            return;
        }

        let isUsernameExists = await isUsernameExist(req.body.email)
        let isPhoneExists = await isPhoneExist(req.body.phone)
        if (isUsernameExists) {
            next(ApiError.conflict("email already exists"))
            return;
        }
        if (isPhoneExists) {
            next(ApiError.conflict("phone already exists"))
            return;
        }

        bCrypt.hash(req.body.password, bCrypt.genSaltSync(8), null, (err, hash) => {
            if (err) {
                console.log(`bcrypt error ${err}`)
                return next(ApiError.internalServerError(err.toString()))
            } else {
                console.log("trying creating user")
                User.create({
                    // id: uuid.v4(),
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: hash,
                    pincode: req.body.pincode,
                    // profileImage: req.body.profileImage,
                    // notificationToken: req.body.notificationToken,
                    // userType: req.body.userType,
                    social_id: req.body.socialID,
                    // loginVia: req.body.loginVia,
                    // created_at: Date.now()
                }).then((result) => {
                    console.log(result)
                    if (result) {
                        const token = getJwtToken(result)
                        return res.status(201).json({
                            status: "created",
                            message: "user created successfully",
                            token: token,
                            id: result['dataValues']['id'],
                            email: result['dataValues']['email'],
                            name: result['dataValues']['name'],
                            userType: result['dataValues']['userType'],
                            profileImage: result['dataValues']['profileImage'],
                        })
                    } else {
                        return next(ApiError.badRequest("failed to create user"))
                    }
                }).catch((error) => {
                    console.log(`catch block ${error}`)
                    if (error)
                        return next(ApiError.conflict(error));
                    else
                        return next(ApiError.internalServerError(error))
                });
            }
        })

    }

    login = async (req, res, next) => {
        User.findOne({
            where: {
                [Op.or]: [{
                    email: req.body.email,
                },
                {
                    phone: req.body.email,
                }
            ]
                // email: req.body.email,
                // phone: req.body.email,
            }
        }).then((result) => {
            if (result) {
                bCrypt.compare(req.body.password, result['dataValues']['password'], (err, hashResult) => {
                    if (err) {
                        return next(ApiError.internalServerError("something went wrong"))
                    }

                    if (hashResult) {
                        const token = getJwtToken(result)
                        return res.status(200).json({
                            status: "success",
                            message: "auth successful",
                            token: token,
                            id: result['dataValues']['id'],
                            email: result['dataValues']['email'],
                            first_name: result['dataValues']['first_name'],
                            last_name: result['dataValues']['last_name'],
                            phone: result['dataValues']['phone'],
                            pincode: result['dataValues']['pincode'],
                        })
                    }
                    return next(ApiError.unAuthorized("invalid credentials"))
                })
            } else {
                return next(ApiError.notFound("user does not exists"))
            }
        }).catch((error) => {
            if (error)
                return next(ApiError.badRequest(error));
            else
                return next(ApiError.internalServerError("something went wrong"))
        });
    }
}

isUsernameExist = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    })
}
isPhoneExist = async (phone) => {
    return await User.findOne({
        where: {
            phone: phone
        }
    })
}

getJwtToken = (user) => {
    return jwt.sign({
        id: user['dataValues']['id'],
        email: user['dataValues']['email'],
        first_name: user['dataValues']['first_name'],
        last_name: user['dataValues']['last_name'],
        phone: user['dataValues']['phone'],
        pincode: user['dataValues']['pincode'],
        environment: process.env.NODE_ENV
    }, process.env.JWT_KEY, {
        issuer: "iTaxEasy",
        expiresIn: "1Y"
    })
}

module.exports = new UserController();