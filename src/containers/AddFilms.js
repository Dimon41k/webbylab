import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import FilePicker from '../components/FilePicker'
import DynamicForm from '../components/DynamicForm'
import { postDataFromFile, insertFilm } from '../actions/'
import Header from '../components/Header'
import ActivityIndicator from 'antd-mobile/lib/activity-indicator'

class AddFilms extends Component {
  render () {
    return (
      <ScrollView>
        <Header to='/' arrow='arrow-back' title='Add films' />
        <ActivityIndicator
          toast
          text='Loading...'
          animating={this.props.animationLoads}
        />
        <DynamicForm sendFilm={this.props.sendFilm} />
        <FilePicker onSendData={this.props.onSendData} default_load_file={this.props.default_load_file} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  animationLoads: state.getIn(['list', 'animationLoads']),
  default_load_file: state.getIn(['list', 'default_load_file'])
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendFilm: (data) => {
    console.log('add film from container')
    dispatch(insertFilm(data))
  },
  onSendData: (data) => {
    console.log(data)
    dispatch(postDataFromFile(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFilms)
