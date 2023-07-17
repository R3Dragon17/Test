'use client'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch, TypedUseSelectorHook  } from 'react-redux'
import influencerRegisterReducer from '@/reducers/influencerRegistration';
import searchReducer from '@/reducers/Search';
import { combineReducers } from 'redux';
import profileReducer from '@/reducers/profile';

const rootReducer = combineReducers({
    search: searchReducer,
    influencerRegister: influencerRegisterReducer,
    profile: profileReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;