/**
 * Created by amitava on 20/02/16.
 */

/*
Middleware that passes api client to promise middleware
 */
export default function clientMiddleware(client) {
    return ({dispatch, getState}) => {
        return next => action => {
            //debugger;
            const {payload, type, ...rest } = action;

            if(payload && typeof payload.promise === 'function'){
                action.payload.promise = payload.promise(client);
            }

            return next(action);
        };
    };
}