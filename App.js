
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './src/components/Home';
import Welcome from './src/components/Welcome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Movie from './src/components/others/Movie';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={Welcome}  style={{backgroundColor:"#000"}} options={{headerShown: false}}/>
        <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="details" component={Movie} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


