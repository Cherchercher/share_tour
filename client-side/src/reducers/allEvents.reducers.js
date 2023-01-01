import { eventConstants } from '../actions/constants';

const initialState = {
    message: '',
    allEvents: [],
    loading: false,
    numberOfInterests: 0,
}

const eventsInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case eventConstants.GETALL_EVENTS_OF_TOUR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case eventConstants.GET_NUMBER_OF_EVENTS_OF_TOUR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case eventConstants.GETALL_EVENTS_OF_TOUR_SUCCESS:
            state = {
                ...state,
                loading: false,
                allInterests: action.payload.reverse()
            }
            break;
            //MAYBE CHANGE TO  NUMBER OF EVENTS BY MONTH
        case eventConstants.GET_NUMBER_OF_EVENTS_OF_TOUR_SUCCESS:
            state = {
                ...state,
                loading: false,
                numberOfInterests: action.payload
            }
            break;
        case eventConstants.GETALL_EVENTS_OF_TOUR_FAILURE:
            state = {
                ...state,
                loading: false,
                message: 'Something went wrong when fetching events...!'
            }
            break;
        case eventConstants.GET_NUMBER_OF_EVENTS_OF_TOUR_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: 'Something went wrong when fetching number of events...!'
            }
            break;

        default:
            break;
    }
    return state;
}

export default eventsInfoReducer