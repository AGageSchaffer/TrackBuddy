import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "../features/userSlice"
import trackSlice from "../features/trackSlice"


export const store = configureStore({
    reducer: {
    [trackSlice.reducerPath]: trackSlice.reducer,
    [loginSlice.reducerPath]: loginSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return (getDefaultMiddleware().concat(loginSlice.middleware, trackSlice.middleware))
    }
})
