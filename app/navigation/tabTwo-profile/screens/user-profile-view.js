// React
import React, { Component } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
// React Native Elements Library
import { Card, List, ListItem, SearchBar, Button } from "react-native-elements";
// Dimensions
var { width, height } = Dimensions.get('window')
// Icon
import Icon from 'react-native-vector-icons/FontAwesome'
// Carousel
import Carousel from 'react-native-looped-carousel';
// Mock Data
import { recipes } from '../../../config/mock-data'
// Constants
const USER_INFO = (height*35)/100
const BCK_IMG = require('../../../assets/background-forest.jpg')
const users = [
  {
    "id": 1,
    "name": "Homer Simpson",
    "pob": "Springfield, US",
    "age": 39,
    "favouriteCocktil": "Martini",
    "avatar": "https://pbs.twimg.com/profile_images/765263431318511617/HfUmI60s.jpg"
  }
]

// Component
export default class UserProfile extends Component {

  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <Image style={[styles.userContainer]} blurRadius={5} resizeMode={'cover'} source={BCK_IMG}>
          <View style={{width: width, backgroundColor: 'rgba(242,73,0, 0.4)'}}>
            {
              users.map( (user) => (
                <View key={user.id} style={[styles.userContainer, {backgroundColor: 'transparent'}]}>
                    <Text style={styles.textStyle}>{user.name}</Text>
                    <Image resizeMode={'contain'} style={styles.userAvatar} source={{uri: user.avatar}}/>
                </View>
              ))
            }
          </View>
        </Image>
        <View style={{height: height - USER_INFO, backgroundColor: 'white'}}>
        {
          users.map( (user) => (
          <View key={user.id} style={{flex: 1, marginVertical: 30}}>
            <Text>Age: {user.age}</Text>
            <View style={{height: 5}}></View>
            <Text>Place of birth: {user.pob}</Text>
            <View style={{height: 5}}></View>
            <Text>Favourite Cocktil: {user.favouriteCocktil}</Text>
            <View style={{height: 5}}></View>
          </View>
          ))
        }
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  userContainer: {
    height: USER_INFO,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color:'black',
    fontWeight: '500',
    fontSize: 24
  },
  userAvatar: {
    width: USER_INFO-80,
    height: USER_INFO-80,
    borderRadius: (USER_INFO-80)/2,
    marginVertical: 10
  }

})
