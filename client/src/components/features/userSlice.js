import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const loginSlice = createApi({
    reducerPath: 'login',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        mode: 'cors',
        prepareHeaders: headers => headers.set('Content-Type', 'application/json')
    }),
    tagTypes: ['users'],
    endpoints(builder){
        return{
            fetchUser: builder.query({
                query(){
                    return 'me'
                },
                providesTags: ['users']
            }),
            postLogin: builder.mutation({
                query({...login}){
                    return {url: 'login',
                    method: 'POST',
                    body: login
                }
            },
            invalidatesTags: ['users']
            }),
            fetchTrack: builder.query({
                query(){
                    return 'tracks'
                },
                providesTags: ['tracks']
            }),
        }
    }
})

export default loginSlice

export const { usePostLoginMutation, useFetchUserQuery,  } = loginSlice