const {User} = require('../models');
const uuid = require('uuid');
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");
const ApiError = require('../errors/ApiError')

class UserController {
    create = async (req, res, next) => {
        console.log(req.body);
        if (req.body.username === undefined) {
            return next(ApiError.badRequest("please enter username"));
        }

        if (req.body.password === undefined) {
            return next(ApiError.badRequest("please enter password"));
        }

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email) !== true) {
            next(ApiError.badRequest("please enter valid email"))
            return;
        }

        let isUsernameExists = await isUsernameExist(req.body.username)
        if (isUsernameExists) {
            next(ApiError.conflict("username already exists"))
            return;
        }

        bCrypt.hash(req.body.password, bCrypt.genSaltSync(8), null, (err, hash) => {
            if (err) {
                console.log(`bcrypt error ${err}`)
                return next(ApiError.internalServerError(err.toString()))
            } else {
                console.log("trying creating user")
                User.create({
                    id: uuid.v4(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    createdAt: Date.now()
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
                email: req.body.email,
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
                            name: result['dataValues']['name'],
                            username: result['dataValues']['username'],
                            profileImage: result['dataValues']['profileImage'],
                            userType: result['dataValues']['userType']
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

isUsernameExist = async (username) => {
    return await User.findOne({
        where: {
            username: username
        }
    })
}

getJwtToken = (user) => {
    return jwt.sign({
        id: user['dataValues']['id'],
        email: user['dataValues']['email'],
        name: user['dataValues']['name'],
        username: user['dataValues']['username'],
        profileImage: user['dataValues']['profileImage'],
        userType: user['dataValues']['userType'],
        environment: process.env.NODE_ENV
    }, process.env.JWT_KEY, {
        issuer: "iTaxEasy",
        expiresIn: "1Y"
    })
}

module.exports = new UserController();