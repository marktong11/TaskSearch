import { FETCH_TASKS } from '../actions';
import _ from 'lodash';

export default function(state= {}, action) {
	switch(action.type) {
		case FETCH_TASKS:
			return action.payload.data.response.docs;
		default:
			return state;
	}
}