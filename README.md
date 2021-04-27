## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Part1](#Part1)
* [Part2](#Part2)
* [Setup](#setup)

## General info
On this project it was used an Expo’s default template. This template has the resolution to the challenge in React Native.
A great relevance is given to the react-native-dotenv module, which is being used on recording and securing WEATHER_API_KEY e da API_URL.
With this usage these values are stored in a .env file, which is required to perform any request at https://openweathermap.org/.
If you cannot find the .env file on the directory please refer to me to get it right.
Even though, this could not be a correct procedure on a real project (or even on GitHub) as .env file is not supposed to be visible.
In general the project is divided into 2 parts, part 1 composed of only 1 screen, and part 2 composed of 3 screens.
The project is aided by react-redux which processes a state in order to assist the user in transporting data throughout the application.
Any doubt or question you might have please refer to: joaojorge.prog@gmail.com or +351914588596. 
Best Regards, João Jorge

## Technologies
Project is created with:
* moment-timezone: ^0.5.32
* @react-native-async-storage/async-storage: ^1.13.3
* @react-native-community/picker: ^1.8.1
* react-native-dropdown-picker: ^3.7.8
* react-native-dotenv: ^2.5.0
* formik: ^2.2.6
* yup: ^0.32.9

## Part1
The expo-location module can determine the user’s location. After checking user’s data, a request is made to API with latitude and longitude. 
A picker was added so the users can pick the unit of measurement they prefer. With the API collected data, the useful information is selected and directed to the components.
These components oversee data management and can present the required information to the users.

## Part2
Part 2 is divided into three screens, with a main screen showing the cities saved so far in memory, their weather forecast, a button that allows you to add the default cities (Lisbon, Madrid ...) and if there are already cities stored then this button is replaced by a button responsible for deleting all saved cities.
In the process of adding a city to the list of favorites, a third page opens, and users can enter the name of the city and the country. This data is verified and any problems presented to the user. When an API call returns a positive value, we have an actual location and the application checks to see if it is already on the favorites list. If it is not already in the list, a vector with all the views of the user is stored with the help of Async-storage.

## Setup
To run this project, install it locally using:.
```
$ yarn install
$ expo start
```
