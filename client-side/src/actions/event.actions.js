import { eventConstants, createEventConstants } from "./constants";
import axios from '../helpers/axios';

const createEvent = (form) => {
    return async (dispatch) => {
        dispatch({
            type: createEventConstants.CREATE_EVENT_REQUEST
        });

        const res = await axios.post(`/create-event`, form);

        if (res.status === 201) {
            dispatch({
                type: createEventConstants.CREATE_EVENT_SUCCESS,
                payload: res.data._event
            });
        } else {
            dispatch({
                type: createEventConstants.CREATE_EVENT_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}

const getOneEvent = (id) => {
    return async (dispatch) => {
        dispatch({
            type: eventConstants.GETONE_EVENT_REQUEST
        });

        const res = await axios.get(`/event/${id}`);

        if (res.status === 200) {
            dispatch({
                type: eventConstants.GETONE_EVENT_SUCCESS,
                payload: {
                    interest: res.data._event
                }
            });
        } else {
            dispatch({
                type: eventConstants.GETONE_EVENT_FAILURE,
                payload: {
                    msg: res.data.msg
                }
            });
        }
    }
}

//controller vs actions
const getEventsByTourId = (tourId) => {
    return async (dispatch) => {
        dispatch({
            type: eventConstants.GETALL_EVENTS_OF_TOUR_REQUEST
        });

        console.log("getting events");
        try {
            const res = await axios.get(`/events/${tourId}`);
    

        // date,
        // tourId, need to change to -> 
        // tourInfo {
            // tourName, tourID,
        // numberOfPeople,
        // meetingPoint,
        // eventDetails,
        // pricingStrategy,
        // budget,
        // currency

        //need to add current number of participants
                          // party of ${event.numberOfPeople}

        //transform into revo-compatible structure
        if (res.status === 200) {
            console.log(res.data);
            const eventList = res.data._events.map(event => {
                    const diffTime = Math.abs(event.startDatetime - event.endDatetime);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    const diffHours = Math.ceil( (diffTime - (diffDays * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    
                    return {
                        // name: interest.userInfo.firstName swap with event name,
                        email: event.userInfo.email,
                        contactNumber: event.userInfo.contactNumber,
                        date: event.startDatetime,//change to start and end date
                        allDay: true,
                        price: event.budget,
                        currency: event.currency,
                        extra: {
                            icon: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                            text: `Meeting Point ${event.meetingPoint}
                            Tour Duration: ${diffDays > 0} ? ${diffDays} Days ${diffHours} Hour(s) : ${diffHours} Hour(s)
                            ${event.pricingStrategy === 'perPerson'} ? Minimum ${event.numberOfPeople} participants  : Maximum ${event.numberOfPeople} participants
                            Event Details: ${event.eventDetails}
                            `
                        }
                    } })
            dispatch({
                type: eventConstants.GETALL_EVENTS_OF_TOUR_SUCCESS,
                payload: eventList
            });
        } else {
            console.log(res.data.error);
            dispatch({
                type: eventConstants.GETALL_EVENTS_OF_TOUR__FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    } catch (e) {

            console.log(e);
    }
    }
}


//controller vs actions
const getEventsByOwnerId = (ownerId) => {
    return async (dispatch) => {
        dispatch({
            type: eventConstants.GETALL_EVENTS_OF_OWNER_REQUEST
        });

        const res = await axios.get(`/events/${ownerId}`);

        //transform into revo-compatible structure
        if (res.status === 200) {
            const eventList = res.data._events.flatMap(event => (
                
                    {
                        // name: interest.userInfo.firstName swap with event name,
                        email: event.userInfo.email,
                        contactNumber: event.userInfo.contactNumber,
                        date: new Date(event.date),
                        allDay: true,
                        extra: {
                            icon: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                            text: `party of ${event.numberOfPeople}`
                        }
                    })
            )
            dispatch({
                type: eventConstants.GETALL_EVENTS_OF_OWNER_SUCCESS,
                payload: eventList
            });
        } else {
            dispatch({
                type: eventConstants.GETALL_EVENTS_OF_OWNER__FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}


export {
    createEvent,
    getOneEvent,
    getEventsByTourId,
    getEventsByOwnerId, 
}