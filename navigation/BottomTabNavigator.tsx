import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated as Anime } from 'react-native';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/Part1/TabOneScreen';
import TabTwoScreen from '../screens/Part2/TabTwoScreen';
import WitScreen from '../screens/Wit/WitScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#e32f45'
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: 'red', showLabel: false }}>
      <BottomTab.Screen
        name="Part1"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="gps-fixed" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabOne"
        component={PlusNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/wit3.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff'
              }}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />
      <BottomTab.Screen
        name="Part2"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="filter-variant" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabPlusStack = createStackNavigator<TabTwoParamList>();

function PlusNavigator() {
  return (
    <TabPlusStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <TabPlusStack.Screen
        name="WitScreen"
        component={WitScreen}
        options={{ headerTitle: 'Wit' }}
      />
    </TabPlusStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})