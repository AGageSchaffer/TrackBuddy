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
            createPost: builder.mutation({
                query: ({...post}) => ({
                    url: 'posts',
                    method: "POST",
                    body: post
                    }),
                    async onQueryStarted(_, {dispatch, queryFulfilled}) {
                        try {
                            await queryFulfilled
                            dispatch(postSlice.util.updateQueryData())
                        } catch {
                            dispatch(postSlice.util.invalidateTags(['posts']))
                        }
                    
                }
                
            }),
            createPostTimescore: builder.mutation({
                query({...post}){
                    return {url: 'timescores',
                    method: "POST",
                    body: post
                    }
                },
                invalidatesTags: ['posts']
            }),
            updatePost: builder.mutation({
                query({...post}){
                    return {url: 'posts',
                    method: "PATCH",
                    body: post
                    }
                },
                invalidatesTags: ['posts']
            })
        }
    }
})

export default postSlice

export const { useFetchPostQuery, useCreatePostMutation, useUpdatePostMutation, useCreatePostTimescoreMutation } = postSlice