import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { render } from '@testing-library/react-native';
import { baseUrl } from './utils/constants';
import { Provider } from 'react-redux';

// Mock the RTK API
jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  createApi: jest.fn(),
}));
export const mockApi = createApi({
  reducerPath: 'Pokemon',
  baseQuery: fetchBaseQuery({ 
    baseUrl: baseUrl ,
    fetchFn:jest.fn
  }),
  preloadedState: {},
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: (page = 0) => `/pokemon?limit=${itemsPerPage}&offset=${itemsPerPage * page}`,
    }),
    getPokemonByName: builder.query({
      query: (name) => `/pokemon/${name}`,
    }),
  }),
});
export const mockStore = configureStore({
  reducer: {
    [mockApi.reducerPath]: mockApi.reducer,
  },
  preloadedState: {},

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mockApi.middleware),
});

beforeEach(() => {
  jest.clearAllMocks();
  // Reset the store before each test
  mockStore.getState().mockApi = undefined;
});

export const renderWithProviders = (children) => {
  return render(
    <Provider store={mockStore}>
      {children}
    </Provider>
  );
};