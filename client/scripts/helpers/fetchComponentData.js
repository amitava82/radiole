/**
 * Created by amitava on 10/02/16.
 */
var _ = require('lodash');
var Promise = require('bluebird');

export function fetchComponentData(dispatch, components, props) {
    var _components = _.compact(components);
    const needs = _components.reduce( (prev, current) => {
        return (current.needs || [])
            .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
            .concat(prev);
    }, []);

    var fnq = [];
    var n = _.reduce(needs, function(memo, i){
        if(_.isArray(i)){
            var fn = i[0];
            if(fnq.indexOf(fn.name) === -1){
                fnq.push(fn.name);
                memo.push(i);
            }
        }else if(fnq.indexOf(i.name) === -1){
            fnq.push(i.name);
            memo.push(i);
        }
        return memo;
    }, []);

    const promises = n.map(need => {
        if(_.isArray(need)){
            var fn = need[0], params = need[1];
            return dispatch(fn(_.get(props, params)))
        }else {
            return dispatch(need());
        }
    });
    return Promise.all(promises);
}

/*
    component have static fetchData function which returns promise
 */
export function fetchData(components, store, props){
    const promises = components.map(function (component, index) {
        if (component && typeof component.fetchData !== 'function') {
            return false;
        }

        return component && component.fetchData(props, store);
    });

    return Promise.all(promises)

}