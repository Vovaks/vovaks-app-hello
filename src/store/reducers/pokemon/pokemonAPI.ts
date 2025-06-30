// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IPokemon, IPokemonListResponse  } from '../../../models/IPokemon'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<IPokemonListResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: 'pokemon',
        params: { offset: (page - 1) * limit, limit },
      }),
    }),
    getPokemonByName: builder.query<IPokemon, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi