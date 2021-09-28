import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from 'react'
import NasaDetails from "./src/NasaDetails";
import NasaHome from './src/NasaHome'

const Stack=createNativeStackNavigator();

function app(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'NasaHome'} component={NasaHome} options={{headerTitle:'Home'}}/>
        <Stack.Screen name={'NasaDetails'} component={NasaDetails} options={{headerTitle:'Details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default app;