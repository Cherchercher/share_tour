import { interestConstants } from '../actions/constants';

const initialState = {
    message: '',
    allInterests: [],
    loading: false,
    numberOfInterests: 0,
}

const interestsInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case interestConstants.GETALL_INTERESTS_OF_TOUR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case interestConstants.GET_NUMBER_OF_INTERESTS_OF_TOUR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case interestConstants.GETALL_INTERESTS_OF_TOUR_SUCCESS:
            state = {
                ...state,
                loading: false,
                allInterests: action.payload.reverse()
            }
            break;
        case interestConstants.GET_NUMBER_OF_INTERESTS_OF_TOUR_SUCCESS:
            state = {
                ...state,
                loading: false,
                numberOfInterests: action.payload
            }
            break;
        case interestConstants.GETALL_INTERESTS_OF_TOUR_FAILURE:
            state = {
                ...state,
                loading: false,
                message: 'Something went wrong when fetching interests...!'
            }
            break;
        case interestConstants.GET_NUMBER_OF_INTERESTS_OF_TOUR_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: 'Something went wrong when fetching number of interests...!'
            }
            break;

        default:
            break;
    }
    return state;
}

export default interestsInfoReducer