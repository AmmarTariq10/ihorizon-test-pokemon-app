import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles'
import { getPokemonImageUrl } from '../../utils/helperFunctions';
const PokemonListItem = ({ onPress, pokemon }) => {
  const { url,  name } = pokemon
  const image = getPokemonImageUrl(url)
  return (
    <TouchableOpacity testID='pokemonTouchable' onPress={onPress} >
      <View style={styles.container}>
        <Image testID='pokemonImage' source={{ uri: image }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonListItem;