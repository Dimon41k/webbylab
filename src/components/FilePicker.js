import React, { Component } from 'react'
import { ScrollView, Image, View, WebView, TextInput, Button } from 'react-native'
import Expo from 'expo';
import cfg from '../config/cfg'
import { Content, Icon, List, ListItem, Text } from 'native-base';
import arrayToArrayOfObjects from '../utils/parse_file'
import { asyncRequest, postDataFromFile } from '../actions/'



export default class FilePicker extends Component {
  constructor(props){
      super(props);
      this.state = {
          error: false,
          file_host: cfg.host + cfg.def_file,
          data_from_file:''
      }
  }

  getText = async(cb, link)=>{
    console.log('from get text');

    if(link===undefined){
        let pickedFile = await Expo.DocumentPicker.getDocumentAsync("*/*");
        link = pickedFile.uri
    }   
    console.log(link,'from get end');

    const status = await Expo.FileSystem.downloadAsync(
        link,
        Expo.FileSystem.documentDirectory + 'buff_file.txt'
    ).catch(error=>{
        console.log(error,'from get error');

        this.setState({file_host: cfg.host+cfg.bufFileName, error: true});
    });

    let stringFile = await Expo.FileSystem.readAsStringAsync(status.uri);

     cb(arrayToArrayOfObjects(stringFile));
  }

  render () {
        return (
            <View>
            <Text>Pick file for load films</Text>
            <Button onPress={()=>this.getText(this.props.onSendData)} title='Pick File'/>
            <Text>Or download by url</Text>
            <TextInput
            value={this.state.file_host}
            onChangeText={(text) => this.setState({file_host:text})}
            />
            <Button title="Download" onPress={()=>this.getText(this.props.onSendData, this.state.file_host)}></Button>
            <View style={{width:'100%', height:20}}></View>
            </View>
        )
    }
}
