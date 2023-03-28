import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "../features/userSlice"
import trackSlice from "../features/trackSlice"
import postSlice from "../features/postSlice"
import favoritesSlice from "../features/favoritesSlice"
import timeScoreSlice from "../features/timeScoreSlice"
import othersSlice from "../features/othersSlice"

export const store = configureStore({
    reducer: {
        [postSlice.reducerPath]: postSlice.reducer,
        [trackSlice.reducerPath]: trackSlice.reducer,
        [favoritesSlice.reducerPath]: favoritesSlice.reducer,
        [loginSlice.reducerPath]: loginSlice.reducer,
        [othersSlice.reducerPath]: othersSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return (getDefaultMiddleware().concat(trackSlice.middleware, postSlice.middleware, favoritesSlice.middleware, loginSlice.middleware, othersSlice.middleware))
    }
})
