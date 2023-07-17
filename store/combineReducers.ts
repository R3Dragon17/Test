import influencerRegisterReducer from '@/reducers/influencerRegistration'
import profileReducer from '@/reducers/profile'
import searchReducer from '@/reducers/Search'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    search: searchReducer,
    influencerRegister: influencerRegisterReducer,
    profile: profileReducer,
})