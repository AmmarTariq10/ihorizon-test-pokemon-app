import React from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { store } from './src/store/pokemon/pokemonSlice';
import HomeScreen from './src/screens/Home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation';
import { StatusBar } from 'react-native';
import { primaryColor } from './src/utils/colors';


// Setup listeners for RTK Query
setupListeners(store.dispatch);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={primaryColor}/>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;