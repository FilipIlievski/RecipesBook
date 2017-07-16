// React
import React, { Component } from "react";
import { View, Text, Image, FlatList,
         ActivityIndicator, TouchableWithoutFeedback, StyleSheet,
         ScrollView, TouchableOpacity, Dimensions } from "react-native";
// React Native Elements Library
import { List, ListItem, SearchBar, Button } from "react-native-elements";
// Dimensions
const { width, height } = Dimensions.get('window')
// Icon
import Icon from 'react-native-vector-icons/FontAwesome'
// Carousel
import Carousel from 'react-native-looped-carousel';
// Constants
const SEARCH_WIDTH = (width*80)/100
// Mock Data
import { recipes } from '../../../config/mock-data'

// Component
export default class RecipesList extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: false,
      data: [],
      error: null,
      page: 1,
      seed: 1,
      refreshing: false,
      size: { width, height },
      icon: 'carouselIcon',
      showList: true,
      // curTime: null,
      // timerRef: null,
    }
  }
  // Timers
  // _calculateTime() {
  //   var timeRef = setInterval(() => {
  //       this.setState({
  //           curTime: new Date()
  //       })
  //   }, 1000)
  //   this.setState({
  //       timerRef: timeRef
  //   })
  // }

  // Helper functions
  async _makeRemoteRequest() {
    const { page, seed } = this.state

    // 24 items
    const url = 'https://api.myjson.com/bins/7k0e5'

    this.setState({loading: true})

    fetch(url)
      .then(res => res.json())
      .then(res =>{
        this.setState({
          data: ( this.state.data == [] ? null : res),
          error: res.error || null,
          loading: false,
          refreshing: false
        })
        // console.log('Status: ', data);
      })
      .catch(error => {
        this.setState({
          error,
          loading: false})
      })
  }

  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this._makeRemoteRequest();
      }
    );
  };

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  _renderHeader = () => {
    var listIcon = {name: 'list', type: 'font-awesome', size: 23}
    var carouselIcon = {name: 'view-carousel', type: 'MaterialCommunityIcons', size: 23}
    return (
      <View style={styles.headerContainer}>
        <View style={{width: SEARCH_WIDTH}}>
          <SearchBar placeholder="Type Here..." lightTheme round />
        </View>
        <View style={styles.headerButtonRight}>
          <Button
            onPress={this._changeAppearance}
            icon={carouselIcon}
            buttonStyle = {styles.headerButtonRightStyle}
          />
        </View>
      </View>
    )
  };

  _renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this._makeRemoteRequest();
      }
    );
  };

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  _changeAppearance = () => {
    this.setState({
      showList: !this.state.showList
    })
  }

// koristenje na nadvoresni biblioteki
  _renderCarouselGallerie = () => {
    var recipes = this.state.data
    var listIcon = {name: 'list', type: 'font-awesome', size: 23}
    return(
      <View style={styles.carouselMainContainer}>
        <View style={[styles.headerButtonRight, { width:width, height: 47, marginVertical: 15,}]}>
          <Button
            onPress={this._changeAppearance}
            icon={listIcon}
            buttonStyle = {styles.headerButtonRightStyle}
          />
        </View>
        <View style={{flex: 1, marginTop: -425}} onLayout={this._onLayoutDidChange}>
          <Carousel
            delay={3500}
            style={this.state.size}
            autoplay
            onAnimateNextPage={(p) => console.log(p)}
          >
            {recipes.map( (recipe) => (
              <TouchableWithoutFeedback key={recipe.id} onPress = { () => this.props.navigation.navigate('DetailsRecipes', {...recipe}) }>
                <View style={[this.state.size ,{flex:1}]}>
                  <Image source={{ uri: recipe.imageURL}} resizeMode={"cover"} style={styles.carouselImage}>
                      <Text style={styles.carouselImageTitle}>{recipe.name.toUpperCase()}</Text>
                  </Image>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </Carousel>
        </View>
      </View>
    )
  }

  _renderMainList = () => {
    return(
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
      <FlatList
        data = {this.state.data}
        renderItem = { ({item}) => (

          <View style={styles.cardContainer}>
            <ListItem
              onPress = { () => this.props.navigation.navigate('DetailsRecipes', {...item}) }
              containerStyle={{ borderBottomWidth: 10 }}
              title = {
                <View style={styles.card}>
                  <View style={styles.imageContainer}>
                     <Image source={{ uri: item.imageURL}} resizeMode={"cover"} style={{width: width/3, flex: 1}}/>
                  </View>

                  <View style={{width: width/2, marginHorizontal: 15}}>
                    <View style={styles.nameLayer}>
                      <Text style={styles.cocktailName}>{item.name}</Text>
                    </View>
                    <View style={{marginVertical: 10,}}>
                      <Text style={{fontSize: 15}}>
                        Main alcohol: <Text style={{color: 'rgba(0, 0, 0, 0.7)'}}>{ item.mainAlcohol }</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              }
            />
          </View>

        )}
        keyExtractor = { (item) => item.id}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        onRefresh={this._handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this._handleLoadMore}
        onEndReachedThreshold={50}
      />
    </List>
  )
  }

  // Lifecycle
  componentDidMount(){
    // asynchronous call is done
    this._makeRemoteRequest().done()
  }

  render(){
    return(
      <View style={{flex: 1, height: height, width: width}}>
       {
         this.state.data == []
          ? <View style={{flex: 1, height: height, width: width}}></View>
          : (this.state.showList == true ? this._renderMainList() : this._renderCarouselGallerie() )
       }
      </View>
    )
  }
}

var styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    height: 100,
    marginHorizontal: 5
  },
  imageContainer: {
    width: width/3,
    marginVertical: -10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  cardContainer: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  headerContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical: 15,
  },
  headerButtonRight: {
    flex: 1,
    width: width - SEARCH_WIDTH,
    height: 47,
  },
  headerButtonRightStyle: {
    backgroundColor: 'rgba(242,73,0, 0.9)',
    marginHorizontal: -16,
    paddingLeft: 22,
    marginTop: 0
  },
  nameLayer: {
    marginBottom: 10
  },
  cocktailName: {
    fontSize: 26,
  },
  carouselMainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  carouselImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    width: width,
    height: height
  },
  carouselImageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 30
  },
})
