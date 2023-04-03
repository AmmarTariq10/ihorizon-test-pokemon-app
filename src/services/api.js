import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, itemsPerPage } from '../utils/constants';
import { store } from '../store/pokemon/pokemonSlice';

export const pokemonApi = createApi({
    reducerPath: 'Pokemon',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getPokemonList: builder.query({
            query: (page = 0) => `/pokemon?limit=${itemsPerPage}&offset=${itemsPerPage * page}`,
        }),
        getPokemonByName: builder.query({
            query: (name) => `/pokemon/${name}`,
        }),
    }),
});
export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;