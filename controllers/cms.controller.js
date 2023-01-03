
var cards= require('../config/cards.json');
const ApiError = require('../errors/ApiError');
class cmsController{
    getHomeScreen = async (req, res, next) => {
        res.status(200).json({
            status: "success",
          
            data:cards.home
        });
    };

    
    updateMainHeading=async (req, res, next) => {
        var token = req.header('authorization')
    if (token) {
        const fs = require('fs');
            const fileName = '../config/cards.json';
            const file = require(fileName);
            const newheading=req.body.mainHeading;   
            file.home.upper.mainHeading = newheading;
                
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
              if (err) return console.log(err);
              console.log(JSON.stringify(file));
              console.log('writing to ' + fileName);
            });
        res.status(200).json({ 
            status: "success",
          
            data:cards.home
        });
    } else {
        return next(ApiError.unAuthorized("invalid credentials"))
    }
    };

    updateSubHeading=async (req, res, next) => {
        var token = req.header('authorization')
    if (token) {
        const fs = require('fs');
            const fileName = '../config/cards.json';
            const file = require(fileName);
            const newheading=req.body.subHeading;   
            file.home.upper.subHeading = newheading;
                
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
              if (err) return console.log(err);
              console.log(JSON.stringify(file));
              console.log('writing to ' + fileName);
            });
        res.status(200).json({ 
            status: "success",
          
            data:cards.home
        });
    } else {
        return next(ApiError.unAuthorized("invalid credentials"))
    }
    };

    updateButton=async (req, res, next) => {
        var token = req.header('authorization')
    if (token) {
        const fs = require('fs');
            const fileName = '../config/cards.json';
            const file = require(fileName);
            const newheading=req.body.button;   
            file.home.upper.button = newheading;
                
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
              if (err) return console.log(err);
              console.log(JSON.stringify(file));
              console.log('writing to ' + fileName);
            });
        res.status(200).json({ 
            status: "success",
          
            data:cards.home
        });
    } else {
        return next(ApiError.unAuthorized("invalid credentials"))
    }
    };

    updateNavcard=async (req, res, next) => {
        var token = req.header('authorization')
    if (token) {
        const fs = require('fs');
            const fileName = '../config/cards.json';
            const file = require(fileName);
            const newheading=req.body.navcards;   
            file.home.navcards = newheading;
                
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
              if (err) return console.log(err);
              console.log(JSON.stringify(file));
              console.log('writing to ' + fileName);
            });
        res.status(200).json({ 
            status: "success",
          
            data:cards.home
        });
    } else {
        return next(ApiError.unAuthorized("invalid credentials"))
    }
    };


    getCards = async (req, res, next) => {
        res.status(200).json({
            status: "success",
          
            data:cards.cards
        });
    };
    getNavCards = async (req, res, next) => {
        res.status(200).json({
            status: "success",
          
            data:cards.navcards
        });
    };
    getContent = async (req, res, next) => {
        res.status(200).json({
            status: "success",
          
            data:cards.content
        });
    };
    getongoingPro = async (req, res, next) => {
        res.status(200).json({
            status: "success",
          
            data:cards.ongoingPro
        });
    };
    getCorporatePro = async (req, res, next) => {
        res.status(200).json({
            status: "success",
          
            data:cards.corporatePro
        });
    };
    
}
module.exports = new cmsController();