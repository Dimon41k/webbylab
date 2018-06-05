import { combineReducers } from 'redux-immutable'
import FilmList from './film_list'
import { fromJS } from 'immutable';

const rootReducer = combineReducers({
  list: FilmList,
});
export default rootReducer;