const Event = require('../models/venue');
const Deal = require('../models/deal');
const slugify = require('slugify');

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const createEvent = (req, res) => {
    const { tourId, numberOfPeople, budget, currency, meetingPoint, eventDetails, pricingStrategy, startDatetime, endDatetime, ownerId } = req.body;

    const event = new Event({
        startDatetime,
        endDatetime,
        tourId,
        numberOfPeople,
        meetingPoint,
        eventDetails,
        pricingStrategy,
        budget,
        currency
    });

    event.save((error, _event) => {
        if (error) return res.status(400).json({ msg: `While creating event something went wrong`, error });
        if (_event) return res.status(201).json({ _event });
    })
}

const getEventByEventId = (req, res) => {
    const { eventId } = req.params;
    if (eventId) {
        Event.findOne({ _id: eventId })
            .exec((error, _event) => {
                if (error) return res.status(400).json({ msg: `Something went wrong`, error });
                if (_event) res.status(200).json({ _event });
            })
    } else {
        return res.status(400).json({ msg: `Event dosen't exit` });
    }
}

const getAllEventsByOwnerId = async (req, res) => {
    const { ownerId } = req.params;
    if (ownerId) {
        Event.find({ ownerId: ownerId })
            .exec((error, _allevents) => {
                if (error) return res.status(400).json({ msg: `Something went wrong`, error });
                if (_events) res.status(200).json({ _events });
            })
    }
}

const getAllEventsByTourId = async (req, res) => {
    const { tourId } = req.params;
    console.log("in controller getting events for", tourId )
    if (tourId) {
        Event.find({ tourId: tourId })
            .exec((error, _allevents) => {
                if (error) return res.status(400).json({ msg: `Something went wrong`, error });
                if (_events) res.status(200).json({ _events });
            })
    }
}

module.exports = {
    createEvent,
    getEventByEventId,
    getAllEventsByOwnerId,
    getAllEventsByTourId
}