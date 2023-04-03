import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PokemonListItem from './PokemonListItem';

describe('PokemonListItem', () => {
  const props = {
    onPress: jest.fn(),
    pokemon: {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    },
  };
  it('renders the Pokemon name and image', () => {
    const { getByText, getByTestId } = render(<PokemonListItem {...props} />);
    expect(getByText('Pikachu')).toBeDefined();
    expect(getByTestId('pokemonImage')).toBeDefined();
  });
  it('calls the onPress function when pressed', () => {
    const { getByTestId } = render(<PokemonListItem {...props} />);
    const touchable = getByTestId('pokemonTouchable');
    fireEvent.press(touchable);
    expect(props.onPress).toHaveBeenCalled();
  });
});