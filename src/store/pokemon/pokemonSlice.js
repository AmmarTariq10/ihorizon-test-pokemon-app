import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { baseUrl } from '../../utils/constants';
// import { pokemonApi } from '../../services/api';
const pokemonApi = createApi({
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
export const store = configureStore({
  reducer: {
    Pokemon: pokemonApi.reducer,
  },
  preloadedState: {
    Pokemon: {
    }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
export default store