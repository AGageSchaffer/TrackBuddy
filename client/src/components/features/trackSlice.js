import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const trackSlice = createApi({
    reducerPath: 'tracks',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: headers => headers.set('Content-Type', 'application/json')
    }),
    tagTypes: ['tracks'],
    endpoints(builder){
        return{
            fetchTrack: builder.query({
                query(){
                    return 'tracks'
                },
                providesTags: ['tracks']
            }),
        }
    }
})

export default trackSlice

export const { useFetchTrackQuery } = trackSlice