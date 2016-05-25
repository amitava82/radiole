/**
 * Created by amitava on 25/05/16.
 */

const initialState = {
    featured: {},
    mine: {}
};

export default function entities(state = initialState, action){
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }

    return state
}