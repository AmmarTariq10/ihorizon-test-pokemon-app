import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './services/api';
import { render } from '@testing-library/react-native';

// Mock the RTK API
jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  createApi: jest.fn(),
  
}));

const mockStore = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  preloadedState:null,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

beforeEach(() => {
  jest.clearAllMocks();
  // Reset the store before each test
  mockStore.getState().pokemonApi = undefined;
});

export const renderWithProviders = (component) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};