import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "../features/userSlice"
import trackSlice from "../features/trackSlice"
import postSlice from "../features/postSlice"


export const store = configureStore({
    reducer: {
        [postSlice.reducerPath]: postSlice.reducer,
        [trackSlice.reducerPath]: trackSlice.reducer,
        [loginSlice.reducerPath]: loginSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return (getDefaultMiddleware().concat(loginSlice.middleware, trackSlice.middleware, postSlice.middleware))
    }
})
