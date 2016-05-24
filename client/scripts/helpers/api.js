/**
 * Created by amitava on 06/02/16.
 */
import superagent from 'superagent';
import {normalize, arrayOf} from 'normalizr';
import isArray from 'lodash/isArray';

import { stringify } from 'qs'
const methods = ['get', 'post', 'put', 'patch', 'del'];
const Promise = require('bluebird');

Promise.config({
    // Enable cancellation.
    cancellation: true
});

class _ApiClient {
    constructor(req, config) {
        function formatUrl(path, prefix) {
            if(path.indexOf('http') > -1) return path;

            const _prefix = prefix === false ? '' : '/api';

            const adjustedPath = path[0] !== '/' ? '/' + path : path;
            if (typeof window === 'undefined') {
                // Prepend host and port of the API server to the path.
                return 'http://' + config.get('host') + ':' + config.get('port') + _prefix + adjustedPath;
            }
            // Prepend `/api` to relative URL, to proxy to API server.
            return _prefix + adjustedPath;
        }
        methods.forEach((method) =>
            this[method] = (path, {params, data, schema, prefix} = {}) => new Promise((resolve,reject,onCancel) => {

                const url = formatUrl(path, prefix);
                const request = superagent[method](url);

                if(method != 'get' && !data){
                    data = params;
                    params = null;
                }

                if (params) {
                    request.query(stringify(params, { arrayFormat: 'brackets' }));
                }else{
                    params = {};
                    params._ = new Date().getTime();
                    request.query(params);
                }

                if (typeof window === 'undefined' && req && req.get('cookie')) {
                    request.set('cookie', req.get('cookie'));
                }

                if (data) {
                    request.send(data);
                }
                request.end((err, {body} = {}) => {
                    if(err){
                        return reject(body || err);
                    }else {
                        if(schema){
                            return body ? resolve(normalize(body, schema)) : resolve(normalize({}, schema));
                        }else{
                            return resolve(body);
                        }
                    }
                });

                onCancel(() => request.abort());

            }));
    }
}

const ApiClient = _ApiClient;

export default ApiClient;