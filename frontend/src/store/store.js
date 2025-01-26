import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { AuthReducer } from './auth.slice'
import {dataReducer} from './data.slice'
const store = configureStore({
    reducer:combineReducers({AuthReducer,dataReducer})
})

export default store;