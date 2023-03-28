import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const timeScoreSlice = createApi({
    reducerPath: 'timeScore',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: headers => headers.set('Content-Type', 'application/json')
    }),
    tagTypes: ['timeScore'],
    endpoints(builder){
        return{
            fetchtimeScore: builder.query({
                query(){
                    return 'timeScores'
                },
                providesTags: ['timeScore']
            }),
            createtimeScore: builder.mutation({
                query: ({...timeScore}) => ({
                    url: 'timeScores',
                    method: "POST",
                    body: timeScore
                    }),
                    async onQueryStarted(_, {dispatch, queryFulfilled}) {
                        try {
                            await queryFulfilled
                            dispatch(timeScoreSlice.util.updateQueryData())
                        } catch {
                            dispatch(timeScoreSlice.util.invalidateTags(['timeScore']))
                        }
                    }
            }),
            updatetimeScore: builder.mutation({
                query({...timeScore}){
                    return {url: 'timeScores',
                    method: "PATCH",
                    body: timeScore
                    }
                },
                invalidatesTags: ['timeScore']
            })
        }
    }
})

export default timeScoreSlice

export const { useFetchTimeScoreQuery, useCreateTimeScoreMutation, useUpdateTimeScoreMutation } = timeScoreSlice