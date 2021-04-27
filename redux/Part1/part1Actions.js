import axios from 'axios'
import { FETCH_WEATHER_COORDS_REQUEST, FETCH_WEATHER_COORDS__SUCCESS, FETCH_WEATHER_COORDS__FAILURE } from './part1Types'
import config from '../../config'

export const fetchWeatherCoordsRequest = () => {
    return {
        type: FETCH_WEATHER_COORDS_REQUEST
    }
}

const fetchWeatherCoordsSuccess = weather => {
    return {
        type: FETCH_WEATHER_COORDS__SUCCESS,
        payload: weather
    }
}

const fetchWeatherCoordsFailure = error => {
    return {
        type: FETCH_WEATHER_COORDS__FAILURE,
        payload: error
    }
}

export const fetchWeatherCoords = (latitude, longitude, unitsSystem) => {
    return (dispatch) => {
        dispatch(fetchWeatherCoordsRequest)
        const weatherUrl = `${config.API_URL_DATA}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${config.WEATHER_API_KEY}`
        axios.get(weatherUrl)
            .then(response => {
                const weather = response.data
                dispatch(fetchWeatherCoordsSuccess(weather))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchWeatherCoordsFailure(errorMsg))
            })
    }
}