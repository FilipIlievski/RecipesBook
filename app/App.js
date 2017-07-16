import React, { Component } from 'react'

import { Provider } from 'react-redux';

import Store from './Store';
import TabBarNavigation from './navigation/tabBar/screens/tabBarNavigation'

const App = () => (
  <Provider store={Store}>
    <TabBarNavigation />
  </Provider>
);

export default App;
