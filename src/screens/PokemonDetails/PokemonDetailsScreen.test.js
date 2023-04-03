import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetPokemonByNameQuery } from '../../services/api';
import PokemonDetailsScreen from './PokemonDetailsScreen';
import { configureStore } from '@reduxjs/toolkit';
import { mockStore, renderWithProviders } from '../../setupTests';
jest.mock('../../services/api');

jest.mock('@react-navigation/native');
describe('PokemonDetailsScreen', () => {
  beforeEach(() => {
    useNavigation.mockReturnValue({ setOptions: jest.fn() });
  });
  it('renders the details screen', async () => {
    const { getByText, getByTestId, getByAltText } = renderWithProviders(<PokemonDetailsScreen  route={{ params: { pokemon: { name: 'bulbasaur' } } }} />);

    useGetPokemonByNameQuery.mockReturnValue({
      data: {
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
      },
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });
    
    await waitFor(() => {
      expect(getByTestId('pokemon-image')).toBeDefined();
      expect(getByAltText('Bulbasaur')).toBeDefined();
      expect(getByText('Name: Bulbasaur')).toBeDefined();
      expect(getByText('Height: 7 cm')).toBeDefined();
      expect(getByText('Weight: 6.9 Kg')).toBeDefined();
      expect(getByText('Types: Grass, Poison')).toBeDefined();
    });
  });

  it('renders the loading indicator', () => {
    useGetPokemonByNameQuery.mockReturnValue({
      data: {
        results:[],
        count:0
      },
      isLoading: true,
      isFetching: false,
      isError: false,
      error: null,
    });

    const { getByText, getByTestId, getByAltText } = renderWithProviders(<PokemonDetailsScreen  route={{ params: { pokemon: { name: 'bulbasaur' } } }} />, {preloadedState:mockStore ,wrapper: mockStore });
    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('renders the error message', () => {
    useGetPokemonByNameQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      isError: true,
      error: { message: 'Failed to load Pokemon' },
    });

    const { getByText, getByTestId, getByAltText } = renderWithProviders(<PokemonDetailsScreen  route={{ params: { pokemon: { name: 'bulbasaur' } } }} />, {preloadedState:mockStore ,wrapper: mockStore });
    expect(getByText('Failed to load Pokemon')).toBeDefined();
  });
});