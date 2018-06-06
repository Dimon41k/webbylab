import React from 'react'
import { StyleSheet, View, FlatList, Alert, Dimensions } from 'react-native'
import ActivityIndicator from 'antd-mobile/lib/activity-indicator'
import { SwipeRow, Button, Icon, Text } from 'native-base'

export default class SwipeableList extends React.Component {
  constructor (props) {
    super(props)
    this.state = Dimensions.get('window')
  }

  componentDidMount () {
    if (this.props.list.length === undefined) { this.props.getFilms({type: this.props.type, find: this.props.find}, this.props.nextPage) }
  }

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.props.getFilms({type: this.props.type, find: this.props.find}, this.props.nextPage)
      this.onEndReachedCalledDuringMomentum = true
    }
  }

  getItemOfList = (params) => {
    let infoStr = `film: ${params.title} \nyear: ${params.year} \nformat: ${params.format} \nstars: `
    params.actors.forEach(element => {
      infoStr += `${element.first_name} ${element.second_name}, `
    })
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success onPress={() => Alert.alert('Film info', infoStr, [
            {text: 'OK', onPress: () => console.log('OK Pressed')}
          ])}>
            <Icon active name='information-circle' />
          </Button>
        }
        body={
          <View>
            <Text>{params.title}</Text>
          </View>
        }
        right={
          <Button danger onPress={() => Alert.alert('Delete film', `Do you really want to delete this movie?`, [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
            {text: 'OK', onPress: () => this.props.deleteFilm(params.id)}
          ])}>
            <Icon active name='trash' />
          </Button>
        }
      />
    )
  }

  getSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE'
        }}
      />
    )
  }

  render () {
    return (
      <View style={styles.size}>
        {
          this.props.list.length > 0 &&
          <View style={this.state.width > this.state.height ? {height: '50%'} : {height: '70%'}}>
            <FlatList
              data={this.props.list}
              renderItem={({ item }) => this.getItemOfList(item)}
              keyExtractor={item => item.title}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.01}
              ItemSeparatorComponent={this.getSeperator}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
            />
          </View>
        }
        {this.props.animationLoads &&
        <View style={styles.loading}>
          <ActivityIndicator
            toast
            text='Loading...'
            animating
          />
        </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  size: {
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  loading: {
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '50%',
    width: '100%',
    zIndex: 1
  }
})
