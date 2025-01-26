

import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import  ThemReducers  from './themSlice'
import { authReducer } from './authSlice';
import { dataReducer } from './dataSlice';

const store = configureStore({
    reducer:combineReducers({ThemReducers,authReducer,dataReducer})
})

export default store;