/**
 * Created by amitava on 25/05/16.
 */
import {API_ERROR_TYPE, RESET_API_ERROR} from '../../constants';

export default function errorMessage(state = null, action) {
    const { type, payload } = action;

    if (type === RESET_API_ERROR) {
        return null
    } else if (type === API_ERROR_TYPE) {
        console.log(payload);
        return payload;
    }

    return state
}