/**
 * Created by amitava on 27/05/16.
 */

var jobConstants = require('../../../engine/constants');

const timeSchedules = {
    daily: jobConstants.DAILY_SCHEDULE_TIME,
    weekly: jobConstants.WEEKLY_SCHEDULE_TIME
};

module.exports = function(deps){

    return {
        createEmailJob(frequency, userid){
            var agenda = deps.agenda;
            var schedule = timeSchedules[frequency];
            
            var job = agenda.create(jobConstants.SEND_EMAIL_DIGEST, {user_id: userid});
            job.repeatEvery(schedule, {
                timezone: jobConstants.TIMEZONE
            });
            job.save();
        },
        
        cancelJob(query){
            var agenda = deps.agenda;
            agenda.cancel(query)
        }
    }
};