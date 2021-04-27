import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPlacesScreen from './MyPlacesScreen'
import MainScreenPart2 from './MainScreenPart2'
import AddPlacesScreen  from './AddPlacesScreen'

function HomeScreenPart2({ navigation }) {
  return (
    <MainScreenPart2 navigation={navigation} />
  );
}

function MyPlacesScreens({ navigation, route }) {
  return (
    <MyPlacesScreen navigation={navigation} />
  );
}

function AddPlacesScreens({ navigation }) {
  return (
    <AddPlacesScreen navigation={navigation}/>
  );
}

const Stack = createStackNavigator();

function TabTwoScreen() {
  return (
    <Stack.Navigator initialRouteName="Places">
      <Stack.Screen options={{ headerShown: false }} name="Places" component={HomeScreenPart2} />
      <Stack.Screen name="MyPlaces" component={MyPlacesScreens} />
      <Stack.Screen options={{ headerShown: false }} name="AddPlaces" component={AddPlacesScreens} />
    </Stack.Navigator>
  );
}

export default TabTwoScreen;
