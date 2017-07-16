// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
// React Navigation
import { addNavigationHelpers } from 'react-navigation'
// Custom Navigation Conf
import { NavigatorTabOne } from '../navigation-configuration'
// Icon
import Icon from 'react-native-vector-icons/FontAwesome'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabOneRecipes 
  }
}

class RecipesNavigation extends Component {
  static navigationOptions = {
    tabBarLabel: 'Recipes',
    tabBarIcon: ({ tintColor }) => <Icon size={ 24 } name={ 'glass' } color={ tintColor }/>
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorTabOne
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(RecipesNavigation)
