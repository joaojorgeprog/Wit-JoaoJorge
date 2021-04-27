import { FETCH_WEATHER_COORDS_REQUEST, FETCH_WEATHER_COORDS__SUCCESS, FETCH_WEATHER_COORDS__FAILURE } from './part1Types'

const initialState = {
    loading: false,
    weatherCurrent: null,
    weather7Days: null,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_COORDS_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case FETCH_WEATHER_COORDS__SUCCESS:
            return {
                ...state,
                loading: false,
                weatherCurrent: action.payload.current,
                weather7Days: action.payload.daily,
                error: '',
            }
        case FETCH_WEATHER_COORDS__FAILURE:
            return {
                ...state,
                loading: false,
                weatherCurrent: null,
                weather7Days: null,
                error: action.payload
            }

        default: return state
    }
}

export default reducer