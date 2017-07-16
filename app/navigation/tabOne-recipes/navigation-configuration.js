import React from 'react'
import { View, Text } from 'react-native'

// R-N-Elements
import { List, ListItem, Button } from 'react-native-elements'

import { StackNavigator } from 'react-navigation'
import { Platform, StatusBar } from 'react-native';

// Screens
import RecipesList from './screens/recipes-view'
import DetailsRecipes from './screens/details-recipes-view'


const routeConfiguration = {
  RecipesList: {
    screen : RecipesList,
    navigationOptions: ({navigation}) => ({
    title: "Cocktails Heaven",
    headerTintColor: 'white',
    headerStyle:{ backgroundColor: 'rgba(242,73,0, 0.9)'},
    }),
  },
  DetailsRecipes: {
    screen : DetailsRecipes,
    navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.name}`,
        headerLeft: null,
        gesturesEnabled: true,
        headerTintColor: 'white',
        headerStyle:{ backgroundColor: 'rgba(242,73,0, 0.9)'}
      }),
    },
  }

const stackNavigatorConfiguration = {
  headerMode: 'screen',
  initialRouteName: 'RecipesList',
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
}

export const NavigatorTabOne = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
