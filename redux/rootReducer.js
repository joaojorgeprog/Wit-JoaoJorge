import { combineReducers } from 'redux'
import part1Reducer from './Part1/part1Reducer'
import part2Reducer from './Part2/part2Reducer'

const rootReducer = combineReducers({
    part1: part1Reducer,
    part2: part2Reducer,
})

export default rootReducer