import { CompaniesActions } from "../actions";

interface IInitialState {
    companies: Object
    isLoading: boolean,
}

const initialState: IInitialState = {
    isLoading: false,
    companies: {}
}

export const CompaniesReducer = function (state: IInitialState = initialState, action: { type: string, payload?: any }) {
    let newState = null;
    switch (action.type) {
        case CompaniesActions.COMPANIES:
            return Object.assign(state, { isLoading: true });
        case CompaniesActions.COMPANIES_SUCCESS:
            newState = state;

            newState.companies[action.payload['$key']] = action.payload;
            newState.isLoading = false;
            delete newState.companies[action.payload['$key']]['$key'];
            return Object.assign({}, state, newState)
        case CompaniesActions.POST_STUDENTS_COMPANIES_SUCCESS:
            console.log('POST_STUDENTS_COMPANIES_SUCCESS', action.payload)
            return Object.assign(state, state); 
        default:
            return state
    }
}