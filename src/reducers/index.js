import { combineReducers } from 'redux-immutable'
import FilmList from './film_list'

const rootReducer = combineReducers({
  list: FilmList
})
export default rootReducer
