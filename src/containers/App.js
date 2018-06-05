import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'
import thunk from "redux-thunk"
import FilmList from './FilmList'
import AddFilms from './AddFilms'


const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <NativeRouter>
    <View style={styles.container}>
      <Route  path="/add" component={AddFilms}/>
      <Route exact path="/" component={FilmList}/>
    </View>
  </NativeRouter>
)

const styles = StyleSheet.create({
  container: {
    marginTop: '2%'
  },
})

export default ()=>(
  <Provider store={store}>
    <App/>
  </Provider>
)
