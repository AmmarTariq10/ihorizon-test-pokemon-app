import React from 'react';
import { act, render } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { useGetPokemonListQuery } from '../../services/api';
import { renderWithProviders } from '../../setupTests';
import { capitalize } from '../../utils/helperFunctions';
// import { render } from '../../setupTests';

jest.mock('../../services/api');

describe('HomeScreen', () => {
    const mockNavigation = { navigate: jest.fn() };
    it('should render a list of pokemons', async () => {
        const mockData = {
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
            count: 3,
        };
        let component = renderWithProviders(<HomeScreen navigation={mockNavigation} />)
        useGetPokemonListQuery.mockReturnValue({ data: mockData, isLoading: false, error: undefined, isFetching: false });
        expect(component.getByText(capitalize('bulbasaur'))).toBeDefined();
        expect(component.getByText(capitalize('ivysaur'))).toBeDefined();
    });

    it('should display loading indicator when loading', async () => {
        const mockNavigation = { navigate: jest.fn() };
        useGetPokemonListQuery.mockReturnValue({ data: undefined, isLoading: true, error: undefined, isFetching: false });

        let component;
        // await act(async () => {
        component = renderWithProviders(<HomeScreen navigation={mockNavigation} />)
        // });

        expect(component.getByTestId('loading-indicator')).toBeDefined();
    });

    it('should display error message when there is an error', async () => {
        const mockNavigation = { navigate: jest.fn() };
        const mockError = 'Error fetching pokemon data';
        useGetPokemonListQuery.mockReturnValue({ data: undefined, isLoading: false, error: mockError, isFetching: false });

        let component;
        // await act(async () => {
        component = renderWithProviders(<HomeScreen navigation={mockNavigation} />)
        // });

        expect(component.getByText(mockError)).toBeDefined();
    });

    it('should load more pokemon when end of list is reached', async () => {
        const mockNavigation = { navigate: jest.fn() };
        let component = renderWithProviders(<HomeScreen navigation={mockNavigation} />)
        const mockData1 = {
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
            count: 2,
        };
        const mockData2 = {
            results: [
                { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
            ],
            count: 3,
        };
        useGetPokemonListQuery.mockReturnValueOnce({ data: mockData1, isLoading: false, error: undefined, isFetching: false })
            .mockReturnValueOnce({ data: mockData2, isLoading: false, error: undefined, isFetching: false });
        expect(component.getByText(capitalize('bulbasaur'))).toBeDefined();
        expect(component.getByText(capitalize('ivysaur'))).toBeDefined();
        expect(component.getByText(capitalize('venusaur'))).toBeDefined();
    });
});