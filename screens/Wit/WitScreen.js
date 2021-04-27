import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Linking, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, FlatList, Image, StatusBar, Animated, Button, ScrollView, TextInput } from 'react-native';

const WitScreen = ({ navigation: { setParams }, navigation , route}) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listDependences} onPress={() => Linking.openURL(item.url).catch((err) => console.error('An error occurred', err)) }>
      <Image
        source={require('../../assets/icons/git.png')}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: '#fff'
        }}
      />
      <Text style={styles.item}>{item.title}</Text>
      
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="auto"/>
      <Text style={styles.title}>General Info</Text>
        <Text style={styles.generalInfo}>{'    '} On this project it was used an Expo’s default template. This template has the resolution to the challenge in React Native.
        A great relevance is given to the react-native-dotenv module, which is being used on recording and securing WEATHER_API_KEY e da API_URL.
        With this usage these values are stored in a .env file, which is required to perform any request at https://openweathermap.org/.
        If you cannot find the .env file on the directory please refer to me to get it right.
        Even though, this could not be a correct procedure on a real project (or even on GitHub) as .env file is not supposed to be visible.
        In general the project is divided into 2 parts, part 1 composed of only 1 screen, and part 2 composed of 3 screens.
        The project is aided by react-redux which processes a state in order to assist the user in transporting data throughout the application.
      </Text>
      <Text style={styles.generalInfo}>
          {'    '} Any doubt or question you might have please refer to: joaojorge.prog@gmail.com or +351914588596. 
        {'    '}Best Regards, João Jorge
      </Text>

      <Text style={styles.title}>Technologies</Text>
        <View>
      <FlatList
            horizontal={true}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        nestedScrollEnabled 
        data={[
          { key: '1', title: "moment-timezone: ^0.5.33", url: "https://github.com/moment/moment-timezone" },
          { key: '2', title: "@react-native-async-storage/async-storage: ^1.15.4", url: "https://github.com/react-native-async-storage/async-storage"  },
          { key: '3', title: "@react-native-community/picker: ^1.8.1", url: "https://www.npmjs.com/package/@react-native-community/picker"  },
          { key: '4', title: "react-native-dropdown-picker: ^4.0.9", url: "https://github.com/hossein-zare/react-native-dropdown-picker#readme"  },
          { key: '5', title: "react-native-dotenv: ^2.5.5", url: "https://github.com/goatandsheep/react-native-dotenv"  },
          { key: '6', title: "formik: ^2.2.6", url: "https://github.com/formium/formik" },
          { key: '7', title: "yup: ^0.32.9", url: "https://github.com/jquense/yup" },
          { key: '8', title: "react-redux: ^7.2.4", url: "https://github.com/reduxjs/react-redux"},
          { key: '9', title: "redux: ^4.1.0", url: "https://github.com/reduxjs/redux" },
          { key: '10', title: "redux-devtools-extension: ^2.13.9", url: "https://github.com/zalmoxisus/redux-devtools-extension" },
          { key: '11', title: "redux-logger: ^3.0.6", url: "https://github.com/LogRocket/redux-logger" },
          { key: '12', title: "redux-thunk: ^2.3.0", url: "https://github.com/reduxjs/redux-thunk" },
          { key: '13', title: "expo-linear-gradient: ^9.1.0", url: "https://github.com/expo/expo/tree/master/packages/expo-linear-gradient" },
        ]}
        renderItem={renderItem}
      />
      </View>

      <Text style={styles.title}>Part 1</Text>
        <Text style={styles.generalInfo}>{'    '} The expo-location module can determine the user’s location. After checking user’s data, a request is made to API with latitude and longitude. 
      A picker was added so the users can pick the unit of measurement they prefer. With the API collected data, the useful information is selected and directed to the components.
These components oversee data management and can present the required information to the users.</Text>
      
      <Text style={styles.title}>Part 2</Text>
      <Text style={styles.generalInfo}>
          {'    '} Part 2 is divided into three screens, with a main screen showing the cities saved so far in memory, their weather forecast, a button that allows you to add the default cities (Lisbon, Madrid ...) and if there are already cities stored then this button is replaced by a button responsible for deleting all saved cities.
In the process of adding a city to the list of favorites, a third page opens, and users can enter the name of the city and the country. This data is verified and any problems presented to the user. When an API call returns a positive value, we have an actual location and the application checks to see if it is already on the favorites list. If it is not already in the list, a vector with all the views of the user is stored with the help of Async-storage.
      </Text>

      <Text style={styles.title}>Setup</Text>
      <Text style={styles.generalInfo}>
          {'    '} To run this project, install it locally using:
      </Text>
        <Text style={styles.generalInfo}>
          {'    '}{'    '}```
      </Text>
        <Text style={styles.generalInfo}>
          {'    '}{'    '}$ yarn install
      </Text>
        <Text style={styles.generalInfo}>
          {'    '}{'    '} $ expo start
      </Text>
        <Text style={styles.generalInfo}>
          {'    '}{'    '}```
      </Text>
      </ScrollView>
    </View>
  );
}

export default WitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    color: 'red',
    marginVertical:10,
    
  },
  generalInfo: {
    textAlign: 'justify',
    fontSize: 15,
    color: '#fff'
  },
  listDependences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical:5,
    color: '#fff'
  },
  item: {
    color: '#fff',
    marginHorizontal: 4
  }
});
