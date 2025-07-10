import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { NewsResponse } from './news.types'

const apiKey = process.env.REACT_APP_THE_NEWS_API_KEY

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thenewsapi.com/v1/' }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, number>({
      query: (page = 1) => `news/all?api_token=${apiKey}&language=en&page=${page}&limit=10`,
    }),
  }),
})

export const { useGetNewsQuery } = newsApi
