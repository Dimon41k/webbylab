import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import SegmentedControl from 'antd-mobile/lib/segmented-control'
import InputItem from 'antd-mobile/lib/input-item'


const initialState = {
  format: 'DVD',
  title: '',
  year: '',
  stars: [[]]
}

export default class DynamicForm extends Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = JSON.parse(JSON.stringify(initialState));
  }

  resetForm = () => {
    this.setState({
      format: 'DVD',
      title: '',
      year: '',
      stars: [[]]
    });
    console.log(this.state);
  }



pickFormat = (value) => {
  this.setState({format: value})
}

render () {
  return (
    <View>
      <InputItem key='title' value={this.state.title} type='text' placeholder='film name' onChange={(x) => this.setState({title: x})}>Title</InputItem>

      <SegmentedControl
        values={['DVD', 'VHS', 'Blu-Ray']}
        onChange={(x) => this.setState({year: x})}
        onValueChange={this.onValueChange}
      />
      <InputItem key='year' value={this.state.year} type='number' placeholder='release year' onChange={(x) => this.setState({year: x})}>Year</InputItem>
      <View>
        {
          this.state.stars.length > 0 ? this.state.stars.map((x, i) => {
            return (
              <View key={i}>
                <InputItem type='text' value={this.state.stars[i][0]} placeholder='Actor name' onChange={(v) => { let array = this.state.stars; array[i][0] = v; this.setState({stars: array}) }}>Name</InputItem>
                <InputItem type='text' value={this.state.stars[i][1]} placeholder='Actor surname' onChange={(v) => { let array = this.state.stars; array[i][1] = v; this.setState({stars: array}) }}>Surname</InputItem>
              </View>
            )
          }) : <Text>Please add actors</Text>
        }
      </View>
      <View style={styles.container}>
      <View style={styles.button} ><Button title='Add actor' onPress={() => { let actors = this.state.stars; console.log(this.state); actors.push([]); this.setState({stars: actors}) }} /></View>
      <View style={styles.button} ><Button title='Send to server' onPress={() => this.props.sendFilm(this.state)} /></View>
      <View style={styles.button} ><Button title='Reset form' onPress={this.resetForm} /></View>
      </View>
      <View style={{height: 5}} />
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'green',
    width: '30%',
    height: 40
  }
});

DynamicForm.propTypes = {
  sendFilm: PropTypes.func.isRequired
}
