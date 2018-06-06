import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import SegmentedControl from 'antd-mobile/lib/segmented-control'
import InputItem from 'antd-mobile/lib/input-item'

export default class DynamicForm extends Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      format: 'DVD',
      title: null,
      year: null,
      stars: [[]]
    }
  }

pickFormat = (value) => {
  this.setState({format: value})
}

render () {
  return (
    <View>
      <InputItem type='text' placeholder='film name' onChange={(x) => this.setState({title: x})}>Title</InputItem>

      <SegmentedControl
        values={['DVD', 'VHS', 'Blu-Ray']}
        onChange={(x) => this.setState({year: x})}
        onValueChange={this.onValueChange}
      />
      <InputItem type='number' placeholder='release year' onChange={(x) => this.setState({year: x})}>Year</InputItem>
      <View>
        {
          this.state.stars.length > 0 ? this.state.stars.map((x, i) => {
            return (
              <View key={i}>
                <InputItem type='text' placeholder='Actor name' onChange={(v) => { let array = this.state.stars; array[i][0] = v; this.setState({stars: array}) }}>Name</InputItem>
                <InputItem type='text' placeholder='Actor surname' onChange={(v) => { let array = this.state.stars; array[i][1] = v; this.setState({stars: array}) }}>Surname</InputItem>
              </View>
            )
          }) : <Text>Please add actors</Text>
        }
      </View>

      <Button title='Add actor' onPress={() => { let actors = this.state.stars; console.log(this.state); actors.push([]); this.setState({stars: actors}) }} />
      <View style={{height: 5}} />
      <Button title='Send to server' onPress={() => this.props.sendFilm(this.state)} />
    </View>
  )
}
}
DynamicForm.propTypes = {
  sendFilm: PropTypes.func.isRequired
}
