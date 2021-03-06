import React from 'react'
import { Text } from 'react-native'
import { Link } from 'react-router-native'
import { Header, Left, Body, Icon } from 'native-base'

export default class Head extends React.Component {
  render () {
    return (
      <Link
        to={this.props.to}
        underlayColor='#f0f4f7'>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Icon name={this.props.arrow} />
          </Left>
          <Body>
            <Text>
              {this.props.title}
            </Text>
          </Body>
        </Header>
      </Link>
    )
  }
}
