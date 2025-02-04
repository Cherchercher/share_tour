const express = require('express');
const { requireSignIn, dealerMiddleware } = require('../common_middlewares/index')
const { createEvent, getEventByEventId,  getAllEventsByTourId, getAllEventsByOwnerId } = require('../controllers/event');
const router = express.Router();
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/create-event', requireSignIn, dealerMiddleware, createEvent)
router.get('/event/:eventId', getEventByEventId)
// router.get('/events/:ownerId', getAllEventsByOwnerId)
router.get('/events/:tourId', getAllEventsByTourId);

module.exports = router;