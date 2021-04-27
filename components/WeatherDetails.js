import React from 'react';
import { View, Text, StyleSheet, FlatList, Image , TouchableOpacity} from 'react-native';
import moment from 'moment-timezone'
//COLORS,DIMENSIONS
import { colors, windowHeight } from '../utils/index'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR, TEMP_MIN_COLOR} = colors

export default function WeatherDetails({ currentWeather, setCurrentWeather}) {

    const _renderItem = ({ item }) => {
        var time = moment
            .unix(item.dt)
            .tz('UTC')
            .format('LL');
        return (
            <TouchableOpacity key={item.dt} underlayColor="#DDDDDD" style={styles.weatherInfo2} onPress={() => {
                setCurrentWeather({
                    "dt": item.dt,
                    "temp": item.temp.morn,
                    "feels_like": item.feels_like.morn,
                    "pressure": item.pressure,
                    "humidity": item.humidity,
                    "wind_speed": item.wind_speed,
                    "weather": item.weather
                });

            }}>
               
                <Image style={styles.weatherIcon} source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png` }} />
                <View>
                    <Text style={{fontWeight: 'bold'}}>{time}</Text>
                    <Text style={{color:'gray'}}>{item.weather[0].description}</Text>
                </View>
                
                <View style={styles.divMaxMinTemp}>
                    <Text style={styles.textMaxTemp}>{Math.floor(item.temp.max)}°</Text>
                    <Text style={styles.textMinTemp} color={'red'}>{Math.floor(item.temp.min)}°</Text>
                </View>

            </TouchableOpacity>
        );
    };
    
    return(
        <View style={{ marginHorizontal: "10%", paddingTop:30, }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Next 7 days</Text>
        <View style={styles.weatherDetails}>
            <FlatList
                nestedScrollEnabled 
                data={currentWeather}
                renderItem={_renderItem}
                horizontal={true}
                style={styles.flat}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.dt.toString()}
                ItemSeparatorComponent={() => <View style={{ margin: 4, borderLeftColor: 'red', borderLeftWidth:1 }} />}
            />

        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flat:{
        backgroundColor: 'white',
        borderRadius:15
    },  
    weatherDetails: {
        marginTop:10,
        height:80,
        backgroundColor: '#E8E8E8',
        borderRadius: 15,
        
    },
    weatherInfo: {
        alignItems: 'center',
        backgroundColor:'#F8F8F8',
        //height: windowHeight*0.2,
        borderRadius:7,
        padding:5,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
    },
    weatherInfo2: {
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: '#F8F8F8',
        //height: windowHeight*0.2,
        borderRadius: 7,
        padding: 5,
        //borderWidth: 1,
        //borderColor: BORDER_COLOR,
        flexDirection:'row',
        
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    textMaxTemp: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        margin: 2,
        fontWeight:'bold'
    },
    textMinTemp: {
        fontSize: 15,
        color: TEMP_MIN_COLOR,
        fontWeight: '500',
        margin:2
    },
    divMaxMinTemp: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    }
})