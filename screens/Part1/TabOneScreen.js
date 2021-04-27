import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import * as Location from 'expo-location';
//COLORS,DIMENSIONS
import { colors } from '../../utils/index'
//API
import config from '../../config'
//COMPONENTS
import WeatherInfo from '../../components/WeatherInfo'
import WeatherDetails from '../../components/WeatherDetails'
import UnitsPicker from '../../components/UnitsPicker'
import ReleadIcon from '../../components/ReleadIcon'
import { fetchWeatherCoords } from '../../redux';
import { useSelector, useDispatch } from 'react-redux'


export default function TabOneScreen() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [weather7Days, setWeather7Days] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

  const weatherCurrent = useSelector(state => state.part1.weatherCurrent)
  const DaysWeather = useSelector(state => state.part1.weather7Days)
  const errorMsg = useSelector(state => state.part1.error)

  const dispatch = useDispatch()

  useEffect(() => {
    load()
  }, [unitsSystem]);

  async function teste(latitude, longitude, unitsSystem) {
    await dispatch(fetchWeatherCoords(latitude, longitude, unitsSystem))
  }

  useEffect(() => {
    if (weatherCurrent != null) {
      setCurrentWeather(weatherCurrent)
    }
  }, [weatherCurrent])

  useEffect(() => {
    if (DaysWeather != null) {
      setWeather7Days(DaysWeather)
    }
  }, [DaysWeather])

  useEffect(() => {
    if (errorMsg != '') {
      setErrorMessage(errorMsg)
    }
  }, [errorMsg])

  async function load() {
    setWeather7Days(null)
    setErrorMessage(null)
    try {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Acess to Location is needed to run the App')
        return
      }
      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords;

      teste(latitude, longitude, unitsSystem)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }


  if (weather7Days && currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {currentWeather &&
          <View style={{ backgroundColor: '#595959', paddingTop:50, borderBottomLeftRadius:500, borderBottomRightRadius: 0}}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSytem={setUnitsSystem} />
          <ReleadIcon load={load} />
            <View style={{top: 20}}>
              
              <WeatherInfo currentWeather={currentWeather} />
            </View> 
          </View>
        }
        {weather7Days &&
          <WeatherDetails currentWeather={weather7Days} unitsSystem={unitsSystem} setCurrentWeather={setCurrentWeather} />
        }

      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});

