// React
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, StyleSheet } from 'react-native'

// R-N-Elements
import { Tile, List, ListItem, Button } from 'react-native-elements';

// Dimensions
var { width, height } = Dimensions.get('window')

export default class DetailsRecipes extends React.Component {

  // Helper methods
  _breakIngredients = (ingredients) => {
    var tmp = ingredients.split(', '), i=0
    return(
      <View>
        {
          tmp.map( (ingredient) => (
            <Text key={i++} style={styles.textStyle}>{ingredient}</Text>
          ))
        }
      </View>
    )
  }
  // Lifecycle
  render(){
    const { id, name, imageURL, preparation, served, ingredients } = this.props.navigation.state.params;
    return(
      <View style={styles.mainContainer}>
        <ScrollView>
          <Image source={{uri: imageURL}} resizeMode={"cover"} style={styles.imgContainer}></Image>

          <View style={[styles.infoContainer, {marginTop: 20}]}>
            <Text style={styles.preparationText}>PREPARATION</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.textStyle}>{preparation}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.preparationText}>INGREDIENTS</Text>
            <View style={styles.horizontalLine}></View>
            {this._breakIngredients(ingredients)}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.preparationText}>SERVED</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.textStyle}>{served}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  imgContainer: {
    flex:1,
    width: width,
    height: width
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 40,

  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: width - 40,
    marginVertical: 10
  },
  preparationText: {
    fontSize: 13,
    textAlign: 'left'
  },
  textStyle: {
    fontSize: 15,
    lineHeight: 20
  }
})
