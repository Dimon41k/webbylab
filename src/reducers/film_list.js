import {
  ADD_FILM,
  DELETE_FILM,
  SHOW_SORTING_LIST_BY_NAME_ASC,
  FIND_FILM_BY_NAME,
  FIND_FILM_BY_ACTOR_NAME,
  IMPORT_FILMS_FROM_TXT,
  CHOOSE_SEARCH_TYPE,
  LOADING
} from '../actions'
import { fromJS } from 'immutable'
import cfg from '../config/cfg'

const FilmList = (state = fromJS({
  data: [],
  type: 'default',
  find: '',
  animationLoads: false,
  nextPage: 0,
  default_load_file: cfg.host + '/' + cfg.default_load_file
}), action) => {
  switch (action.type) {
    case LOADING:
      return state.set('animationLoads', action.load)
    case CHOOSE_SEARCH_TYPE:
      return state.set('find', action.search.find).set('type', action.search.type).set('data', []).set('nextPage', 0)

    case ADD_FILM:

      return state.set('data', [...state.data, action.data])

    case DELETE_FILM:
      return state.set('data', state.get('data').filter(item => item.id !== action.id))

    case SHOW_SORTING_LIST_BY_NAME_ASC:
      let filteringArray = [...state.get('data'), ...action.response.data]
      return state.set('data', filteringArray.sort((a, b) => {
        if (a.title < b.title) { return -1 }
        if (a.title > b.title) { return 1 }
        return 0
      }).filter(function (item, pos, ary) {
        return !pos || item.title !== ary[pos - 1].title
      })).set('nextPage', action.response.nextPage)

    case FIND_FILM_BY_NAME:
      return state.set('data', action.data).set('nextPage', 0)

    case FIND_FILM_BY_ACTOR_NAME:
      return state.set('data', action.data).set('nextPage', 0)

    case IMPORT_FILMS_FROM_TXT:
      return action.payload

    default:
      return state
  }
}
export default FilmList
