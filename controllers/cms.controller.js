
var cards= require('../config/cards.json');
class cmsController{
    getHomeScreen = async (req, res, next) => {
        res.status(200).json({
            status: "success",
          
            data:cards.home
        });
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