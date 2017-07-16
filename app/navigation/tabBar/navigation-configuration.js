import { TabNavigator } from 'react-navigation'
// Tab-Navigators
import RecipesNavigation from '../tabOne-recipes/screens/tabOneNavigation'
import ProfileNavigation from '../tabTwo-profile/screens/tabTwoNavigation'


const routeConfiguration = {
  RecipesNavigation: { screen: RecipesNavigation },
  ProfileNavigation: { screen: ProfileNavigation },
}

const tabBarConfiguration = {

tabBarOptions:{

    activeTintColor: 'white',
    inactiveTintColor: 'blue',

    activeBackgroundColor: 'rgba(242,73,0, 0.9)',
    inactiveBackgroundColor: 'white',


    showLabel: false,

    activeTintColor: 'white',
    inactiveTintColor: 'rgba(242,73,0, 0.9)',

    labelStyle: {
      fontSize: 22,
      color: 'white',
    },
  }
}

export const TabBar = TabNavigator(routeConfiguration,tabBarConfiguration)

export const tabBarReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index:0 }
  } else {
    return TabBar.router.getStateForAction(action,state)
  }
}
