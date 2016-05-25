/**
 * Created by amitava on 31/01/16.
 */
var config = require('config');
import {KEYWORDS} from './constants';
export default function html(markup, initialState, helmet){
    const title = helmet.title.toString() || 'radiole';
    return (
        `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    ${title}
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="keywords" content="${KEYWORDS}">
                    ${helmet.meta.toString()}
                    <meta name="author" content="Amitava Saha">
                    <meta name="copyright" content="(c) 2016 Amitava Saha">
                    <link href='/static/css/client${process.env.NODE_ENV == 'production' ? '.min' : ''}.css' rel='stylesheet' type='text/css'>
                    <script type="application/javascript">
                      window.__INITIAL_STATE__ = ${initialState};
                    </script>
                </head>
                <body>
                    <div id="app-root" class="full-height">${markup}</div>
                    <link href='https://fonts.googleapis.com/css?family=Raleway:400,700,500,900' rel='stylesheet' type='text/css'>
                    <script src="/static/vendor.js" type="text/javascript"></script>
                    <script src="/static/app.js" type="text/javascript"></script>
                    <script async src='https://www.google-analytics.com/analytics.js'></script>
                </body>
            </html>
        `
    )
}