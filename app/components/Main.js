import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Main',
  }

  render() {
    return (
      <View>
        <Text>Recipes Book</Text>
      </View>
    );
  }
}
