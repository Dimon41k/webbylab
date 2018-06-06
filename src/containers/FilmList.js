import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import SwipeableList from '../components/SwipeableList'
import SearchForm from '../components/SearchForm'
import { asyncRequest, deleteById, getByActorName, getByTitle, setSearchParams } from '../actions/'
import Header from '../components/Header'

class FilmList extends React.Component {
  render () {
    return (
      <View>
        <Header to='/add' arrow='arrow-forward' title={'Films list'} />
        <SearchForm getFilms={this.props.getFilms} search={{find: this.props.find, type: this.props.type}} setSearch={this.props.setSearch} nextPage={this.props.nextPage} />
        <SwipeableList getFilms={this.props.getFilms} deleteFilm={this.props.deleteFilm} list={this.props.list} nextPage={this.props.nextPage} find={this.props.find} type={this.props.type} animationLoads={this.props.animationLoads} />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.getIn(['list', 'data']),
    nextPage: state.getIn(['list', 'nextPage']),
    type: state.getIn(['list', 'type']),
    find: state.getIn(['list', 'find']),
    animationLoads: state.getIn(['list', 'animationLoads'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSearch: (search) => {
    dispatch(setSearchParams(search))
  },
  getFilms: (search, nextPage) => {
    if (search.type === 'actor') {
      dispatch(getByActorName(search.find))
    } else if (search.type === 'title') {
      dispatch(getByTitle(search.find))
    } else {
      dispatch(asyncRequest(nextPage))
    }
  },
  deleteFilm: (data) => {
    dispatch(deleteById(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmList)
