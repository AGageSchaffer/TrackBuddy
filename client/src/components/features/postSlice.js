import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const postSlice = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: headers => headers.set('Content-Type', 'application/json')
    }),
    tagTypes: ['posts'],
    endpoints(builder){
        return{
            fetchPost: builder.query({
                query(){
                    return 'posts'
                },
                providesTags: ['posts']
            }),
        }
    }
})

export default postSlice

export const { useFetchPostQuery } = postSlice