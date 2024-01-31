import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './Features/api/BaseApiSlice';
import authSliceReducer from "./Features/AppSlice/authSlice"
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;