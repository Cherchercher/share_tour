import { venueConstants } from '../actions/constants';

const initialState = {
    message: '',
    allVenues: [],
    loading: false
}

const venuesInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case venueConstants.GETALL_VENUES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case venueConstants.GETALL_VENUES_SUCCESS:
            state = {
                ...state,
                loading: false,
                allVenues: action.payload.slice(0).reverse()
            }
            break;
        case venueConstants.GETALL_VENUES_FAILURE:
            state = {
                ...state,
                loading: false,
                message: 'Something went wrong when fetching venues...!'
            }
            break;

        default:
            break;
    }
    return state;
}

export default venuesInfoReducer