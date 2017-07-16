// React
import React, { Component } from 'react'

// Redux
import { conect } from 'react-redux'

// React Navigation
import { addNavigationHelpers } from 'react-navigation'

// Custom Navigation
import { NavigatorTabTwo } from '../navigation-configuration'

// Icon
import Icon from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabTwoProfile // create this reducer
  }
}

class ProfileNavigation extends Component { //TabTwoNavigation
  static navigationOptions = {
    tabBarLabel: 'Tab Two',
    tabBarIcon: ({ tintColor }) => <Icon size={ 24 } name={ 'user' } color={ tintColor }/>
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorTabTwo
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
export default connect(mapStateToProps)(ProfileNavigation)
