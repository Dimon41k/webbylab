import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'react-router-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


export default class Head extends React.Component{
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