import React from 'react'
import { View, TextInput, Picker, Button, StyleSheet, Text } from 'react-native'

export default class SearchForm extends React.Component {
    state = this.props.search;
    getFilms = () => {
      this.props.setSearch(this.state)
      this.props.getFilms(this.state, this.props.nextPage)
    }

    render () {
      return (
        <View style={styles.container}>
          {
            this.state.type !== 'default' &&
          <View style={styles.button}>
  
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => this.setState({find: text})}
              value={this.state.find}
              placeholder={'Search by ' + this.state.type}
            />
          </View>

          }
        <View style={styles.button}>
        <Picker
            style={styles.picker}
            selectedValue={this.state.type}
            onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })} >
            <Picker.Item label='All films' value='default' key='0' />
            <Picker.Item label='By film name' value='title' key='1' />
            <Picker.Item label="actor's films" value='actor' key='2' />
          </Picker>
        </View>
        <View style={styles.button}>
        <Button style={styles.search} title='Search' onPress={this.getFilms} />

        </View>


        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: '5%'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 40,
  },
  picker:{
    minWidth:'80%',
    height: '100%',
  },
  search:{
    width:'100%',
    height: '100%',
  },
  searchInput:{
    width:'80%',
    height: '100%',
  }
});