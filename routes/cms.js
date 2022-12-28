const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cms.controller')
router.get('/uppper', cmsController.getUpper);
router.get('/cards', cmsController.getCards);
router.get('/navCards', cmsController.getNavCards);
router.get('/content', cmsController.getContent);
router.get('/ongoingPro', cmsController.getongoingPro);
router.get('/corporatePro', cmsController.getCorporatePro);
module.exports = router;