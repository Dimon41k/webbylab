import React from 'react'
import { View, TextInput, Picker, Button } from 'react-native'

export default class SearchForm extends React.Component {
    state = this.props.search;
    getFilms = () => {
      this.props.setSearch(this.state)
      this.props.getFilms(this.state, this.props.nextPage)
    }

    render () {
      return (
        <View>
          {
            this.state.type !== 'default' &&
            <TextInput
              onChangeText={(text) => this.setState({find: text})}
              value={this.state.find}
              placeholder={'Search by ' + this.state.type}
            />
          }
          <Picker
            selectedValue={this.state.type}
            onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })} >
            <Picker.Item label='All films' value='default' key='0' />
            <Picker.Item label='By film name' value='title' key='1' />
            <Picker.Item label="actor's films" value='actor' key='2' />
          </Picker>
          <Button title='Search' onPress={this.getFilms} />
        </View>
      )
    }
}
