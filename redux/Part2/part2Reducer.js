import {
    FETCH_WEATHER_ID_REQUEST,
    FETCH_WEATHER_ID__SUCCESS,
    FETCH_WEATHER_ID__FAILURE,
    FETCH_WEATHER_COORDS_PART2__SUCCESS,
    FETCH_WEATHER_COORDS_PART2_FAILURE,
    RESET_INFO,
    FETCH_VERIFY_CITY_SUCCESS,
    FETCH_VERIFY_CITY_FAILURE,
    CLEAR_CITY,
    NEED_UPDATE,
    DONT_NEED_UPDATE
} from './part2Types'

const initialState = {
    loading: false,
    list: [],
    weatherCurrent: null,
    weather7Days: null,
    error: '',
    errorWeather: '',
    city: null,
    errorCity: '',
    needUpdate: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_ID_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case FETCH_WEATHER_ID__SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload,
                error: '',
            }
        case FETCH_WEATHER_ID__FAILURE:
            return {
                ...state,
                loading: false,
                list: [],
                error: action.payload
            }
        case FETCH_WEATHER_COORDS_PART2__SUCCESS:
            return {
                ...state,
                weatherCurrent: action.payload.current,
                weather7Days: action.payload.daily,
                error: action.payload
            }
        case FETCH_WEATHER_COORDS_PART2_FAILURE:
            return {
                ...state,
                weather7Days: null,
                weatherCurrent: null,
                errorWeather: action.payload
            }
        case RESET_INFO:
            return {
                loading: false,
                list: [],
                weatherCurrent: null,
                weather7Days: null,
                error: '',
                errorWeather: '',
            }
        
        case FETCH_VERIFY_CITY_SUCCESS:
            return {
                ...state,
                city: action.payload,
                errorCity: ''
            }
        
        case FETCH_VERIFY_CITY_FAILURE:
            return {
                ...state,
                city: null,
                errorCity: action.payload
            }

        case CLEAR_CITY:
            return {
                ...state,
                city: null,
                errorCity: ''
            }

        case NEED_UPDATE:
            return {
                ...state,
                needUpdate: true,
            }

        case DONT_NEED_UPDATE:
            return {
                ...state,
                needUpdate: false,
            }

        default: return state
    }
}

export default reducer