import { PostsActions } from "../actions";

interface IInitialState {
    posts: Object,
    isLoading: boolean,
}

const initialState: IInitialState = {
    isLoading: false,
    posts: {}
}

export const PostsReducer = function (state: IInitialState = initialState, action: { type: string, payload?: any }) {
    let newState = null;
    switch (action.type) {
        case PostsActions.ADD_POST:
            return Object.assign(state, state);
        case PostsActions.ADD_POST_SUCCESS:
            console.log('ADD_POST_SUCCESS', action.payload);
            newState = state;
            let key = action.payload['$key'];
            delete action.payload['$key']
            delete action.payload['$exists']
            newState.posts[key] = action.payload;
            return Object.assign(state, newState)
        case PostsActions.NO_POSTS:
            return Object.assign(state, { posts: {} });
        default:
            return state
    }
}