import { interestConstants, addInterestConstants } from "./constants";
import axios from '../helpers/axios';

const addInterest = (form) => {
    return async (dispatch) => {
        dispatch({
            type: addInterestConstants.ADD_INTEREST_REQUEST
        });

        const res = await axios.post(`/create-interest`, form);

        if (res.status === 201) {
            dispatch({
                type: addInterestConstants.ADD_INTEREST_SUCCESS,
                payload: res.data._Interest
            });
        } else {
            dispatch({
                type: addInterestConstants.ADD_INTEREST_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}

const getOneInterest = (id) => {
    return async (dispatch) => {
        dispatch({
            type: interestConstants.GETONE_INTEREST_REQUEST
        });

        const res = await axios.get(`/Interest/${id}`);

        if (res.status === 200) {
            dispatch({
                type: interestConstants.GETONE_INTEREST_SUCCESS,
                payload: {
                    interest: res.data._interest
                }
            });
        } else {
            dispatch({
                type: interestConstants.GETONE_INTEREST_FAILURE,
                payload: {
                    msg: res.data.msg
                }
            });
        }
    }
}

//controller vs actions
const getInterestsByTourId = (tourId) => {
    return async (dispatch) => {
        dispatch({
            type: interestConstants.GETALL_INTERESTS_OF_TOUR_REQUEST
        });

        const res = await axios.get(`/interests/${tourId}`);

        //transform into revo-compatible structure
        if (res.status === 200) {
            const eventList = res.data._interests.flatMap(interest => (
                interest.dates.map(date =>  
                    ({
                        name: interest.userInfo.firstName,
                        email: interest.userInfo.email,
                        contactNumber: interest.userInfo.contactNumber,
                        date: new Date(date),
                        allDay: true,
                        extra: {
                            icon: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                            text: `party of ${interest.numberOfPeople}`
                        }
                    })
            )
            ))
            dispatch({
                type: interestConstants.GETALL_INTERESTS_OF_TOUR_SUCCESS,
                payload: eventList
            });
        } else {
            dispatch({
                type: interestConstants.GETALL_INTERESTS_OF_TOUR_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}

const getNumberOfInterestsByTourId = (tourId) => {
    return async (dispatch) => {
        dispatch({
            type: interestConstants.GET_NUMBER_OF_INTERESTS_OF_TOUR_REQUEST
        });

        try {
            const res = await axios.get(`/numberOfInterests/${tourId}`);
        
        
        if (res.status === 200) {
            dispatch({
                type: interestConstants.GET_NUMBER_OF_INTERESTS_OF_TOUR_SUCCESS,
                payload: res.data._numberOfInterests
            });
        } else {
            dispatch({
                type: interestConstants.GET_NUMBER_OF_INTERESTS_OF_TOUR_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    } catch(e) {
        console.log(e);
    }
    }
}

const getInterestsByLocation = (location) => {
    return async (dispatch) => {
        dispatch({
            type: interestConstants.GETALL_INTERESTS_OF_LOCATION_REQUEST
        });

        const res = await axios.get(`/interests/${location}`);

        if (res.status === 200) {
            dispatch({
                type: interestConstants.GETALL_INTERESTS_OF_LOCATION_SUCCESS,
                payload: res.data._interests
            });
        } else {
            dispatch({
                type: interestConstants.GETALL_INTERESTS_OF_LOCATION_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}

export {
    addInterest,
    getInterestsByLocation,
    getInterestsByTourId,
    getNumberOfInterestsByTourId
}