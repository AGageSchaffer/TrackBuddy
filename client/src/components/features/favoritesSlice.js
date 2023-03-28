import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const favoritesSlice = createApi({
    reducerPath: 'favorites',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: headers => headers.set('Content-Type', 'application/json')
    }),
    tagTypes: ['favorites'],
    endpoints(builder){
        return{
            fetchFavorites: builder.query({
                query(){
                    return 'favorites'
                },
                providesTags: ['favorites']
            }),
        }
    }
})

export default favoritesSlice

export const { useFetchFavoritesQuery } = favoritesSlice