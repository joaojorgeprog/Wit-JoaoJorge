import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import moment from 'moment-timezone'
import { LinearGradient } from 'expo-linear-gradient';
//COLOS,DIMENSIONS
import { colors, windowWidth } from '../utils/index'
const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherInfo({currentWeather}) {
    const { weather: [details] } = currentWeather
    const { icon, main, description } = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    var time = moment
        .unix(currentWeather.dt)
        .tz('UTC')
        .format('LL');
    return (
        <View style={styles.weatherInfo}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#ff3333', '#660000']}
                style={styles.background}
            />
            <Text style={styles.textDay}>{time}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconUrl}} />
            <Text style={styles.textPrimary}>{Math.floor(currentWeather.temp)}° C</Text>
            
            <View style={styles.mainDiv}>
                <View style={styles.middleDivs}>
                    <View><Text style={styles.textTitle}>Feels like</Text></View>
                    <View><Text style={styles.textSecundary}>{Math.floor(currentWeather.feels_like)} ºC</Text></View>
                </View>
                <View style={styles.middleDivs}>
                    <View><Text style={styles.textTitle}>Wind</Text></View>
                    <View><Text style={styles.textSecundary}>{Math.floor(currentWeather.wind_speed)}</Text></View>
                </View>
                <View style={styles.middleDivs}>
                    <View><Text style={styles.textTitle}>Humidity</Text></View>
                    <View><Text style={styles.textSecundary}>{Math.floor(currentWeather.humidity)} %</Text></View>
                </View>
                <View style={styles.middleDivs}>
                    <View><Text style={styles.textTitle}>Pressure</Text></View>
                    <View><Text style={styles.textSecundary}>{Math.floor(currentWeather.pressure)}</Text></View>
                </View>
                
            </View>

            <View style={styles.mainField}>
                <Text style={{color: "#fff", textAlign: 'center', fontSize: 17, fontWeight: '700'}}>{main} | {description}</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        borderRadius: 25
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 25,
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 19,
        color: '#fff',
    },
    mainField: {
        backgroundColor: 'black',
        width: "80%",
        borderRadius: 40,
        paddingVertical:18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        marginVertical: 15
    },
    textTitle: {
        color: "white",
        fontSize: 12,
        marginVertical: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    textSecundary: {
        color: '#fff',
        fontWeight: '700',
        fontSize:21
    },
    mainDiv: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        width: "80%"
    },
    middleDivs: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "25%",
        
    },
    weatherInfo: {
      alignItems: 'center',
      marginHorizontal: 50,
      borderRadius: 25,
        backgroundColor: '#1E90FF',
      marginTop: 30,
        shadowColor: "#1E90FF",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    
    },
    weatherDescription : {
        textTransform: 'capitalize'
    },
    weatherIcon: {
        width: 150,
        height: 150
    },
    textPrimary: {
        fontSize: 50,
        color: "white"
    },
    textSecondary: {
        fontSize: 20,
        color:SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10
    },
    textDay: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
        color:"#fff"
    },
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        width: windowWidth*0.8
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20,
    },
    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    }
  });
  