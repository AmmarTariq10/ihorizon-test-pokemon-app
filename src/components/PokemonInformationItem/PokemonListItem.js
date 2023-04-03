import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'
const PokemonInformationItem = ({ label, value }) => {
  const renderValue = () => {
    if (Array.isArray(value)) {
      return (
        <View testID='valuesContainer' style={styles.valuesContainer}>
          {value.map(v => <Text key={`${label}-${v}`} style={styles.value}>{v}</Text>)}
        </View>
      )
    } else {
      return <Text style={styles.value}>{value}</Text>
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {renderValue()}
    </View>
  );
};

export default PokemonInformationItem;