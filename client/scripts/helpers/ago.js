/**
 * Created by amitava on 28/05/16.
 * from react timeago
 */
var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365;

export default function ago(date){
    var then = new Date(date).valueOf();
    var now = Date.now();
    var seconds = Math.round(Math.abs(now - then) / 1000);
    var suffix = then < now ? 'ago' : 'from now';
    var _ref = seconds < MINUTE ? [Math.round(seconds), 'second'] : seconds < HOUR ? [Math.round(seconds / MINUTE), 'minute'] : seconds < DAY ? [Math.round(seconds / HOUR), 'hour'] : seconds < WEEK ? [Math.round(seconds / DAY), 'day'] : seconds < MONTH ? [Math.round(seconds / WEEK), 'week'] : seconds < YEAR ? [Math.round(seconds / MONTH), 'month'] : [Math.round(seconds / YEAR), 'year'];

    var value = _ref[0];
    var unit = _ref[1];
    
    return format(value, unit, suffix);
}

function format(value, unit, suffix) {
    if (value !== 1) {
        unit += 's';
    }
    return value + ' ' + unit + ' ' + suffix;
}