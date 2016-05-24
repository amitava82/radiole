/**
 * Created by amitava on 20/02/16.
 */
const app = 'spotch';

export default function (module, constants) {
       return constants.map(i => {
           return `${app}/${module}/${i}`;
       });
}