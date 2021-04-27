import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Alert } from 'react-native';
import { fetchWeatherById, fetchWeatherCoordsPart2, resetData, dontNeedUpdate } from '../../redux';
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
//COLORS,DIMENSIONS
import { windowWidth, windowHeight } from '../../utils/index'
//COMPONENTS
import WeatherDetails from '../../components/WeatherDetails'
import WeatherInfo from '../../components/WeatherInfo'
import ReleadIcon from '../../components/ReleadIcon'
import { getStorage, setStorage, deleteStorage} from '../../utils/config'
//DATA
import places from '../../default_citys.json'

export default function MainScreenPart2({ navigation }) {
    const list = useSelector(state => state.part2.list)
    const [allPlaces, setAllPlaces] = useState([]);
    const [unitsSystem, setUnitsSystem] = useState('metric');
    const [currentWeather, setCurrentWeather] = useState(null)
    const [weather7Days, setWeather7Days] = useState([])
    const [selectedName, setSelectedName] = useState(null);

    const weatherCurrent = useSelector(state => state.part2.weatherCurrent)
    const DaysWeather = useSelector(state => state.part2.weather7Days)
    const errorMsg = useSelector(state => state.part2.errorWeather)
    const handleNeedUpdate = useSelector(state => state.part2.needUpdate)

    const dispatch = useDispatch()

    useEffect(() => {
        if (handleNeedUpdate == true) {
            getData()
            dispatch(dontNeedUpdate())
        }
    }, [handleNeedUpdate]);

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (weatherCurrent != null){
            setCurrentWeather(weatherCurrent)
        }
    }, [weatherCurrent]);
    useEffect(() => {
        if (DaysWeather != null) {
            setWeather7Days(DaysWeather)
        }
    }, [DaysWeather]);
    

    const getData = async () => {
        const back = await getStorage()
        if (back != false) {
            setAllPlaces(back)
        }else{
            setAllPlaces([])
            setCurrentWeather(null)
            setWeather7Days([])
            setSelectedName(null)
        }
    }
    const getWeatherFromCity = async (city) => {
        await dispatch(fetchWeatherCoordsPart2(city.lat, city.long, unitsSystem))
    }
    const renderCity = ({ item }) => {
        const backgroundColor = item.lat === selectedName ? "gray" : "lightgray";
        return (
            <TouchableOpacity onPress={() => { setSelectedName(item.name); getWeatherFromCity(item) }} style={{
                backgroundColor, margin: 10,
                borderRadius: 10,
                padding: 10,}}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
        );
    }
    const getDefaultCitys = async () => {
        let array = [];
        for (let index = 0; index < places.places.length; index++) {
            array = [...array, places.places[index].id]
        }
        try {
            await dispatch(fetchWeatherById(array.toString()))
        }
        catch (err) {
            console.log('error')
        }
       
    }
    useEffect(() => {
        if(list[0] != undefined){
            saveInMemory(list)
        }
    }, [list]);

    async function saveInMemory(newData) {
        const back = await setStorage(newData)
        if(back == true) {
            setAllPlaces(newData)
        }
    }

    async function removeItemValue() {
        const back = await deleteStorage()
        if(back == true) {
            dispatch(resetData())
        }
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Clear All Locations",
            "Are you sure you want delete all locations?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => { removeItemValue(), getData()} }
            ]
        );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.headerView}>
                <ReleadIcon load={() => getData()} />
                <TouchableOpacity style={styles.addPlacesButton} onPress={() => navigation.navigate('MyPlaces')}>
                    <Text style={styles.textPlaces}>My Places</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnAdd} onPress={() => {
                allPlaces[0] == undefined ? getDefaultCitys() : createTwoButtonAlert()
            }}>
                <Text style={styles.btnAddText}>{allPlaces[0] == undefined ? 'Add Default List' : 'Delete All'}</Text>
            </TouchableOpacity>

           

            {allPlaces &&
            <View>
                <FlatList
                    data={allPlaces}
                    renderItem={renderCity}
                    extraData={selectedName}
                    horizontal={true}
                    keyExtractor={(item) => item.name.toString()}
                    ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
                    ListHeaderComponent={() => (allPlaces[0] === undefined ?
                        <>
                        <Text style={styles.emptyMessageStyle}>{"\n"}No Places Found click in "My Places" to Add Place{"\n"}</Text>
                        </>
                        : null)}
                />
            </View>
            }           
            {currentWeather != null &&
                <>
                <ScrollView style={{ marginBottom: windowHeight*0.04}}>
                    <WeatherInfo currentWeather={currentWeather} />
                    <WeatherDetails currentWeather={weather7Days} unitsSystem={unitsSystem} setCurrentWeather={setCurrentWeather} />
                </ScrollView>
                </>
            }

            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,       
    },
    addPlacesButton: {
        marginTop: 30,
        left: 20,
        width: windowWidth*0.4,
        justifyContent: 'space-around',
        paddingRight: windowWidth*0.05,
    },
    textPlaces: {
        color:'black',
        fontWeight: 'bold',
        fontSize:18
    },
    emptyMessageStyle: {
        padding: windowWidth*0.1
    },
    headerView: {
        flexDirection: 'row',

    },
    btnAdd: {
       justifyContent: 'center',
       alignItems: 'center',
       paddingHorizontal:20,
        backgroundColor: '#303030',
        top: 10,
        borderRadius: 5,
        height:50,
        marginBottom:10
    },
    btnAddText: {
        color: 'white'
    }
});
