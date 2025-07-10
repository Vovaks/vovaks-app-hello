import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import authReducer from './reducers/auth'
import { pokemonApi } from './reducers/pokemon/pokemonAPI'
import { newsApi } from './reducers/news/newsAPI'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware).concat(newsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
