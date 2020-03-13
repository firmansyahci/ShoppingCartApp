import React from 'react'
import { View, Text } from 'react-native'
import MainNavigators from './src/public/navigators/MainNavigators'
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigators />
    </Provider>
  )
}

export default App
