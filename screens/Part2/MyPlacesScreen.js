import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Animated, StatusBar, Image, Alert} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'

import { windowWidth} from '../../utils/index'
import { needUpdate } from '../../redux';
import { getStorage, setStorage } from '../../utils/config'

const BG_IMG = 'https://static.vecteezy.com/system/resources/previews/000/257/652/original/beautiful-technical-wave-design-background-vector.jpg'

const SPACING = 20;
const AVATAR_SIZE = 90;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function MyPlacesScreen({ route, navigation }) {
    const [searchVisible, setSearchVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [allPlaces, setAllPlaces] = useState([]);
    const [allPlacesBackup, setAllPlacesBackup] = useState([]);
    const [query, setQuery] = useState('');

    const handleNeedUpdate = useSelector(state => state.part2.needUpdate)
    const dispatch = useDispatch()


    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (handleNeedUpdate == true) {
            getData()
        }
    }, [handleNeedUpdate]);

    useEffect(() => {
        getData()
        setSuccess(false)
    }, [success]);

    const deletePlace = async (id) =>{
    
        let filteredArray = allPlaces.filter(item => item.id != id)

        const back = await setStorage(filteredArray)

        if(back == true){
            getData()
            dispatch(needUpdate())
        }
    }
    const getData = async () => {
        const back = await getStorage()

        if (back != false) {
            setAllPlaces(back)
            setAllPlacesBackup(back)
        }
    }
    
    useEffect(() => {
        const newData = allPlacesBackup.filter(function (place) {

            const itemData = place.name ? place.name.toUpperCase() : ''.toUpperCase();
            const textData = query.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        setAllPlaces(newData)
    }, [query])

    const createTwoButtonAlert = (location,id) =>
        Alert.alert(
            "Delete location",
            `Are you sure you want delete ${location} locations?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => { deletePlace(id) } }
            ]
        );

    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: BG_IMG }}
                style={{...StyleSheet.absoluteFillObject,...styles.imageDef}}
                blurRadius={80}
            /> 
             <View style={styles.search_add_View}>
                <Ionicons name="md-add" size={30} color="black" style={{ paddingRight: 25 }} onPress={() => navigation.navigate('AddPlaces')}/>
                <Ionicons name="ios-search" size={24} color="black" onPress={() => { getData(); setSearchVisible(!searchVisible)}}/>
             </View>
            {searchVisible && 
                <TextInput
                    style={styles.textInputCity}
                    onChangeText={text => setQuery(text)}
                    value={query}
                />
            }
           
            <Animated.FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={1}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                extraData={query} 
                data={allPlaces}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index * 2)
                    ]

                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index * 1)
                    ]

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, .5]
                    })

                    return <Animated.View style={{
                        flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 20,
                        opacity,
                        transform: [{ scale }]
                    }}>
                        <View style={{ width: windowWidth*0.7 }}>
                            <Text style={styles.textName}>{item.name}</Text>
                            <Text style={styles.textLat}>Lat: {item.lat}</Text>
                            <Text style={styles.textLat}>Long: {item.long}</Text>

                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                            <MaterialCommunityIcons name="delete-outline" size={24} color="red" onPress={() => createTwoButtonAlert(item.name,item.id)} />
                        </View>

                    </Animated.View>
                }}
                keyExtractor={(item) => item.lat.toString()}
                ListHeaderComponent={() => (allPlaces[0] === undefined ?
                    <Text style={styles.emptyMessageStyle}>{"\n"}No Places Found{"\n"}</Text>
                    : null)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textName: {
        fontSize: 22, fontWeight: '700'
    },
    textLat: {
        fontSize: 14, opacity: .8, color: '#0099cc'
    },
    textInputCity: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        width: windowWidth * 0.8,
        marginStart: windowWidth * 0.1,
        borderRadius:5
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius:5
    },
    emptyMessageStyle: {
        marginStart: windowWidth * 0.1,
        fontSize:17
    },
    search_add_View: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 25,
        flexDirection: 'row',
    },
    imageDef: {
        transform: [{ rotate: '180deg' }]
    }
});
