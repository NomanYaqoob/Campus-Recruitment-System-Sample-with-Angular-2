import { StudentsActions } from "../actions";

interface IInitialState {
    students: Object
    isLoading: boolean,
}

const initialState: IInitialState = {
    isLoading: false,
    students: {}
}

export const StudentsReducer = function (state: IInitialState = initialState, action: { type: string, payload?: any }) {
    let newState = null;
    switch (action.type) {
        case StudentsActions.STUDENTS:
            return Object.assign(state, { isLoading: true });
        case StudentsActions.STUDENTS_SUCCESS:
            newState = state;
            newState.students[action.payload['$key']] = action.payload;
            newState.isLoading = false;
            delete newState.students[action.payload['$key']]['$key'];
            return Object.assign({}, state, newState)
        default:
            return state
    }
}