import instance from '../utils/connect'

export const ADD_FILM = 'ADD_FILM',
DELETE_FILM ='DELETE_FILM',
SHOW_SORTING_LIST_BY_NAME_ASC = 'SHOW_SORTING_LIST_BY_NAME_ASC',
FIND_FILM_BY_NAME = 'FIND_FILM_BY_NAME',
FIND_FILM_BY_ACTOR_NAME = 'FIND_FILM_BY_ACTOR_NAME',
IMPORT_FILMS_FROM_TXT = 'IMPORT_FILMS_FROM_TXT',
CHOOSE_SEARCH_TYPE = 'CHOOSE_SEARCH_TYPE',
SET_PAGINATION = 'SET_PAGINATION',
LOADING = 'LOADING'



export const setSearchParams = (search)=>{
    return {
        type: CHOOSE_SEARCH_TYPE,
        search
    }
}


export const importFilmsFromTxt = (data)=>{
    return {
        type: IMPORT_FILMS_FROM_TXT,
        data
    }
}

export const findFilmByActorName = (data)=>{
    return {
        type: FIND_FILM_BY_ACTOR_NAME,
        data
    }
}

export const findFilmByName = (data)=>{
    return {
        type: FIND_FILM_BY_NAME,
        data
    }
}

export const showSortingListNameASC = (response)=>{
    return {
        type: SHOW_SORTING_LIST_BY_NAME_ASC,
        response
    }
}

export const addFilm = (data)=>{
    return {
        type: ADD_FILM,
        data
    }
} 

export const deleteFilm = (id)=>{
    return {
        type: DELETE_FILM,
        id
    }
}

export const loading = indicator => {
    return {
        type: LOADING,
        load: indicator
    }
}

export const asyncRequest = (page)=> dispatch => {
    dispatch(loading(true));
    instance.get('/api/film', {params: {page}}).then((res)=>{
        dispatch(loading(false));
        dispatch(showSortingListNameASC(res.data));
    });
}

export const deleteById = (id)=> dispatch => {
    dispatch(loading(true));
    instance.delete('/api/film', {params: {id}}).then(()=>dispatch(loading(false)));
    dispatch(deleteFilm(id));
}

export const insertFilm = (data) => dispatch => {
    dispatch(loading(true));
    instance.post('/api/film', data).then(()=>{
        dispatch(loading(false));
        dispatch(addFilm(data));
    });
}

export const postDataFromFile = (data) => dispatch => {
    dispatch(loading(true));
    instance.post('/api/film/from_json', data).then(()=>{
        dispatch(loading(false));
        dispatch(importFilmsFromTxt(data));
    });
}

export const getByTitle = (title)=> dispatch => {
    dispatch(loading(true));
    instance.get('/api/film/film_name', {params:{title}}).then((res)=>{
        dispatch(loading(false));
        dispatch(findFilmByName(res.data));
    });
}

export const getByActorName = (name)=> dispatch => {
    dispatch(loading(true));
    instance.get('/api/film/actor_name', {params:{name}}).then((res)=>{
        dispatch(loading(false));
        dispatch(findFilmByActorName(res.data));
    });
}
