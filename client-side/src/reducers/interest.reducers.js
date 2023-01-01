import { interestConstants } from "../actions/constants";

//need to add date range to limit results? more info in user info, or just use Id?
const initialState = {
    interest: {
        _id: '',
        dates: [],
        tourId: '',
        numberOfPeople: 0,
        budgetPerPerson: 0,
        currency: '',
        createdAt: '',
        updatedAt: '',
        userInfo: {}
    },
    message: '',
    loading: false
}

const oneInterestInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case interestConstants.GETONE_INTEREST_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case interestConstants.GETONE_INTEREST_SUCCESS:
            state = {
                ...state,
                interest: action.payload.interest,
                loading: false
            }
            break;
        case interestConstants.GETONE_INTEREST_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.msg
            }
            break;

        default:
            break;
    }
    return state;
}

export default oneInterestInfoReducer