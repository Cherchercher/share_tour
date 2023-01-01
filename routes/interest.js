const express = require('express');
const { requireSignIn, clientMiddleware } = require('../common_middlewares/index')
const { createInterest, modifyInterest, deleteInterest, getInterestsByTourId, getNumberOfInterestsByTourId, getInterestsByUserId } = require('../controllers/interest');
const router = express.Router();

router.post('/create-interest', requireSignIn, clientMiddleware, createInterest)
// router.post('/modify-interest/:interestId', requireSignIn, clientMiddleware, modifyInterest)
// router.post('/delete-interest/:interestId', requireSignIn, clientMiddleware, deleteInterest)
router.get('/interests/:tourId', getInterestsByTourId)
router.get('/numberOfInterests/:tourId', getNumberOfInterestsByTourId)
// router.get('/interests/:userId', getInterestsByUserId)

module.exports = router;