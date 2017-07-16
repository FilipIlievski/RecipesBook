import { StackNavigator } from 'react-navigation'

// Screens
import UserProfile from './screens/user-profile-view'
import About from './screens/about-view'

const routeConfiguration = {
  UserProfile: {
    screen : UserProfile,
    navigationOptions: {
      title: 'Profile',
      headerStyle:{ backgroundColor: 'rgba(242,73,0, 0.9)'},
    }
  },
  About: {
    screen : About,
    navigationOptions: {
      title: 'About',
      headerStyle:{ backgroundColor: 'rgba(242,73,0, 0.9)'},
    }
  }
}

const stackNavigatorConfiguration = {
  // headerMode: 'none', //no header for now
  initialRouteName: 'UserProfile'
}

export const NavigatorTabTwo = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
