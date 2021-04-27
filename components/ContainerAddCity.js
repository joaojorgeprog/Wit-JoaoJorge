import React, {useState, useEffect} from 'react';
import { View , StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { windowWidth } from '../utils/index'
import places from '../data_json.json'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchVerifyCity, clearCity } from '../redux';
import { useSelector, useDispatch } from 'react-redux'
import {getStorage, setStorage} from '../utils/config'


export default function ContainerAddCity({ setSuccess, navigation }) {
    const [allPlaces, setAllPlaces] = useState([]);
    const [countryCode, setCountryCode] = useState(null);
    const [errorSelectCountry, setErrorSelectCountry] = useState('');
    const [errorNoResults, setErrorNoResults] = useState('');
    const city = useSelector(state => state.part2.city)
    const errorMsg = useSelector(state => state.part2.errorCity)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(clearCity())
        getData()
    }, []);

    useEffect(() => {
        if (city != null) {
            storeData(city.lat, city.lon, city.name, city.id)
            dispatch(clearCity())
        }
    }, [city]);

    useEffect(() => {
        if (errorMsg != '') {
            setErrorNoResults(errorMsg)
        }else{
            setErrorNoResults('')
        }
    }, [errorMsg]);

    const getData = async () => {
        const back = await getStorage()
        if(back != false) {
            setAllPlaces(back)
        }
    }


    const storeData = async (latitude,longitude,name,id) => {
            const allData = [...allPlaces,{ "name": name, "lat": latitude, "long": longitude, "id": id }];
            const back = await setStorage(allData)

            if(back == true) {
                setSuccess(true)
            }
    }

    const verifyFields = async(city) => {
        if (countryCode == null){
            setErrorSelectCountry("Please Select Country");
        }else{
            dispatch(fetchVerifyCity(city, allPlaces, countryCode))
        }
    }
    function colorButton(){
        if (errorNoResults.length > 0){
            const color = 'red';
            return color;
        }else{
            const color = 'black';
            return color;
        }
        
    }

    const SignupSchema = Yup.object().shape({
        city: Yup.string().min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>City Name</Text>
           

            <Formik
                initialValues={{ city: '' }}
                onSubmit={values => {
                    verifyFields(values.city)
                }}
                validationSchema={SignupSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, setValues }) => (
                    <View>
                        <TextInput
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                            style={styles.textInputCity}
                        />
                        {errors.city && <Text style={styles.textErrorWarning}>{errors.city}</Text> }
                        <DropDownPicker
                            items={places.places}
                            defaultValue={countryCode}
                            containerStyle={{ height: 40 }}
                            style={styles.dropDown}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => setCountryCode(item.value)}
                            searchable={true}
                            searchablePlaceholder="Search for an item"
                            searchablePlaceholderTextColor="gray"
                            seachableStyle={{}}
                            searchableError={() => <Text>Not Found</Text>}
                        />

                        {errorSelectCountry.length > 0 && countryCode == null &&
                            <Text style={styles.textErrorWarning}>{errorSelectCountry}</Text>
                        }
                        {errorNoResults.length > 0 &&
                            <Text style={styles.textError}>{errorNoResults}</Text>
                        }

                        
                        <TouchableOpacity style={{ ...styles.buttonAdd, backgroundColor: colorButton() }} onPress={handleSubmit}>
                            <Text style={styles.textButtonAdd}>Add City</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonClose} onPress={() => { navigation.navigate('MyPlaces') }}>
                            <Text style={styles.textButtonClose}>Close</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding:20
    },
    textInputCity: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: windowWidth * 0.9, 
        marginStart: windowWidth * 0.05,
        borderRadius:5,
        marginBottom: 20
    },
    buttonAdd: {
        width: windowWidth*0.8,
        alignItems: 'center',
        marginStart: windowWidth*0.1,
        borderRadius: 5,
        padding: 10,
        marginTop: 50,
    },
    buttonClose: {
        backgroundColor: 'white',
        width: windowWidth * 0.8,
        alignItems: 'center',
        marginStart: windowWidth * 0.1,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        borderWidth:1

    },
    textButtonAdd: {
        color: 'white',
        fontWeight: '800',
        fontSize:15
    },
    textButtonClose: {
        color: 'black',
        fontWeight: '800',
        fontSize: 15
    },
    textErrorWarning: {
        color: '#FFCC00',
        fontSize: 15,
        marginStart: windowWidth * 0.05,
    },
    textError: {
        color: 'red',
        marginStart: windowWidth * 0.2,
        fontSize: 15,
        paddingTop:20
    },
    dropDown: { 
        backgroundColor: '#fafafa',
        width: windowWidth * 0.9, 
        marginStart: windowWidth * 0.05 ,
    }
})