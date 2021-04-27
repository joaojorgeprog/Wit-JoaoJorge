import axios from 'axios'
import { FETCH_WEATHER_ID_REQUEST,
        FETCH_WEATHER_ID__SUCCESS, 
        FETCH_WEATHER_ID__FAILURE, 
        FETCH_WEATHER_COORDS_PART2_REQUEST,
        FETCH_WEATHER_COORDS_PART2__SUCCESS,
        FETCH_WEATHER_COORDS_PART2_FAILURE,
        RESET_INFO,
        FETCH_VERIFY_CITY_SUCCESS,
        FETCH_VERIFY_CITY_FAILURE,
        CLEAR_CITY,
        NEED_UPDATE,
        DONT_NEED_UPDATE
        } from './part2Types'
import config from '../../config'

export const fetchWeatherIdRequest = () => {
    return {
        type: FETCH_WEATHER_ID_REQUEST
    }
}

const fetchWeatherIdSuccess = weather => {
    return {
        type: FETCH_WEATHER_ID__SUCCESS,
        payload: weather
    }
}

const fetchWeatherIdFailure = error => {
    return {
        type: FETCH_WEATHER_ID__FAILURE,
        payload: error
    }
}

const fetchWeatherCoordsPart2Success = weather => {
    return {
        type: FETCH_WEATHER_COORDS_PART2__SUCCESS,
        payload: weather
    }
}

const fetchWeatherCoordsPart2Failure = error => {
    return {
        type: FETCH_WEATHER_COORDS_PART2_FAILURE,
        payload: error
    }
}

const resetAllData = () => {
    return {
        type: RESET_INFO
    }
}

const fetchVerifyCitySuccess = estado => {
    return {
        type: FETCH_VERIFY_CITY_SUCCESS,
        payload: estado
    }
}

const fetchVerifyCityFailure = error => {
    return {
        type: FETCH_VERIFY_CITY_FAILURE,
        payload: error
    }
}

const clearCitySuccess = () => {
    return {
        type: CLEAR_CITY,
    }
}




export const fetchWeatherById = (ids) => {
    return (dispatch) => {
        dispatch(fetchWeatherIdRequest)
        const weatherUrl = `${config.API_URL_GROUP}id=${ids}&appid=${config.WEATHER_API_KEY}`
        axios.get(weatherUrl)
            .then(response => {
                const weather = response.data.list.map((user) => ({ "name": user.name, "lat": user.coord.lat, "long": user.coord.lon, "id": user.id }))
                dispatch(fetchWeatherIdSuccess(weather))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchWeatherIdFailure(errorMsg))
            })
    }
}

export const fetchWeatherCoordsPart2 = (latitude, longitude, unitsSystem) => {
    return (dispatch) => {
        const weatherUrl = `${config.API_URL_DATA}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${config.WEATHER_API_KEY}`
        axios.get(weatherUrl)
            .then(response => {
                const weather = response.data
                dispatch(fetchWeatherCoordsPart2Success(weather))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchWeatherCoordsPart2Failure(errorMsg))
            })
    }
}

export const resetData = () => {
    return(dispatch) => {
        dispatch(resetAllData())
    }
}

export const fetchVerifyCity = (city, allPlaces, countryCode) => {
    return (dispatch) => {
        const weatherUrl = `${config.API_URL_WEATHER}q=${city}, ${countryCode}&appid=${config.WEATHER_API_KEY}`
        axios.get(weatherUrl)
            .then(response => {
                const newData = allPlaces.filter(function (place) {
                    const itemData = place.name ? place.name.toUpperCase() : ''.toUpperCase();
                    const textData = response.data.name.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                if (newData[0] != undefined) {
                    dispatch(fetchVerifyCityFailure(`This city is already in your list: ${city}`))
                } else {
                    const data = { "lat": response.data.coord.lat, "lon": response.data.coord.lon, "name": response.data.name, "id": response.data.id }
                    dispatch(fetchVerifyCitySuccess(data))
                }
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchVerifyCityFailure(errorMsg))
            })
    }
}

export const clearCity = () => {
    return (dispatch) => {
        dispatch(clearCitySuccess())
    }
}

export const needUpdate = () => {
    return {
        type: NEED_UPDATE,
    }
}

export const dontNeedUpdate = () => {
    return {
        type: DONT_NEED_UPDATE,
    }
}