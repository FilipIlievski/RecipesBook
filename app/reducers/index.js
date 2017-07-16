// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

// Navigation
import { TabBar, tabBarReducer }    from '../navigation/tabBar/navigation-configuration'
import { NavigatorTabOne }          from '../navigation/tabOne-recipes/navigation-configuration'
import { NavigatorTabTwo }          from '../navigation/tabTwo-profile/navigation-configuration'

export default combineReducers({

  tabBar: tabBarReducer,

  tabOneRecipes: (state, action) => NavigatorTabOne.router.getStateForAction(action, state),

  tabTwoProfile: (state,action) => NavigatorTabTwo.router.getStateForAction(action, state),

  state: (state = {}) => state,

});
