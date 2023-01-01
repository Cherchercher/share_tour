// const { createInterest, modifyInterest, deleteInterest, getInterestsByTourId, getInterestsByUserId } = require('../controllers/interest');

const Interest = require('../models/interest');
const Tour = require('../models/tour');

//add error if mis matched data model
const createInterest = (req, res) => {
    const { tourId, numberOfPeople, budgetPerPerson, currency, dates, userInfo } = req.body;
//     contactNumber
// : 
// "0000000000"
// email
// : 
// "xiaoxuah@uci.ed"
// firstName
// : 
// "CherClient"
// fullName
// : 
// "CherClient Huang"
// lastName
// : 
// "Huang"
// role
// : 
// "client"
// username
// : 
// "_gc5fjpiu"
// _id
// : 
// "638940e2e2f23d06c018efd0"

    const interest = new Interest({
        tourId,
        numberOfPeople,
        budgetPerPerson,
        currency,
        dates: dates,
        userInfo
    });

    interest.save((error, _interest) => {
        if (error) {
            return res.status(400).json({ msg: `While saving interest something went wrong`, error });
        }
        if (_interest) {
            const msg = `Thanks ${_interest.userInfo.firstName}!\nYour interest has been successfully submitted.\nThe dealer will contact you via ${_interest.userInfo.email} or ${_interest.userInfo.contactNumber}`
            return res.status(201).json({msg});
        }
    })
}

const getInterestsByTourId = (req, res) => {
    const { tourId } = req.params;
    if (tourId) {
        Interest.find({ tourId })
        .exec((error, _interests) => {
            if (error) return res.status(400).json({ msg: `Something went wrong in finding all interests`, error });
            if (_interests) res.status(200).json({ _interests });
        })
    } else {
        return res.status(400).json({ msg: `Tour dosen't exit` });
    }
}

const getNumberOfInterestsByTourId = (req, res) => {
    const { tourId } = req.params;
    if (tourId) {
        Interest.count({ tourId })
        .exec((error, _numberOfInterests) => {
            if (error) return res.status(400).json({ msg: `Something went wrong in finding all interests`, error });
            if (_numberOfInterests != null) res.status(200).json({ _numberOfInterests });
        })
    } else {
        return res.status(400).json({ msg: `Tour dosen't exit` });
    }
}

module.exports = {
    createInterest,
    getInterestsByTourId,
    getNumberOfInterestsByTourId
}