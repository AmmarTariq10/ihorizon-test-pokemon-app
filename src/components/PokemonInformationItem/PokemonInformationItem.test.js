import React from 'react';
import { render } from '@testing-library/react-native';
import PokemonInformationItem from './PokemonListItem';

describe('PokemonInformationItem', () => {
  it('renders the label and value', () => {
    const props = {
      label: 'Name',
      value: 'Pikachu',
    };
    const { getByText } = render(<PokemonInformationItem {...props} />);
    expect(getByText('Name')).toBeDefined();
    expect(getByText('Pikachu')).toBeDefined();
  });

  it('renders multiple values if value is an array', () => {
    const propsWithArray = {
      label: 'Abilities',
      value: ['Static', 'Lightning Rod'],
    };
    const { getByText, getByTestId } = render(<PokemonInformationItem {...propsWithArray} />);
    expect(getByText('Abilities')).toBeDefined();
    expect(getByTestId('valuesContainer')).toBeDefined();
    expect(getByText('Static')).toBeDefined();
    expect(getByText('Lightning Rod')).toBeDefined();
  });
});