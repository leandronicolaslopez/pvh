import signup from './screens/signup'
import edit from './screens/edit'
import list from './screens/list'

import addAddress from './screens/addAddress'

import { Provider } from 'react-redux';
import createStore from './configureStore';

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  list: list,
  signup: signup,
  edit: edit,
  addAddress: addAddress
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7BABED',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: 'white'
    },
  });

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return (
      <Provider store={createStore()}>
        <AppContainer />
      </Provider>)
  }
}