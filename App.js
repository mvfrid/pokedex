// https://snack.expo.dev/@mvfrid/matildas-pokeapp

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokeScreen from './components/PokeScreen'
import PokeDetailsScreen from './components/PokeDetailsScreen'

const Stack = createStackNavigator();

export default function App() {
  
  return (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
      <Stack.Screen
          name="Pokemons"
          options={{ title: 'My Pokemons' }}
        >
          {({ navigation }) => <PokeScreen navigation={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="PokemonDetails"
          component={PokeDetailsScreen}
          options={({ route }) => ({ 
              title: route.params.name, 
              gestureEnabled: true,
              gestureDirection: 'horizontal', 
              })}
        />
    </Stack.Navigator>
  </NavigationContainer>


  );
}
