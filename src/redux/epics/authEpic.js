// src/redux/epics/authEpic.js
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import axios from 'axios';

const loginEpic = (action$) =>
    action$.pipe(
        ofType('LOGIN'),
        mergeMap(action =>
            axios.post('/api/u/login', action.payload)
                .then(response => ({
                    type: 'LOGIN_SUCCESS',
                    payload: { role: response.data.role },
                }))
                .catch(error => ({
                    type: 'LOGIN_FAILED',
                    payload: error.message,
                }))
        )
    );

const rootEpic = (action$) => loginEpic(action$);

export default rootEpic;
