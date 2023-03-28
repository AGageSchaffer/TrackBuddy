import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const othersSlice = createApi({
    reducerPath: 'others',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: headers => headers.set('Content-Type', 'application/json')
    }),
    tagTypes: ['others'],
    endpoints(builder){
        return{
            fetchOthers: builder.query({
                query(){
                    return 'others'
                },
                providesTags: ['others']
            }),
        }
    }
})

export default othersSlice

export const { useFetchOthersQuery } = othersSlice