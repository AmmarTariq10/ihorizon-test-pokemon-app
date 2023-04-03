import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { capitalize, getPokemonImageUrl } from '../../utils/helperFunctions';
import { useGetPokemonByNameQuery, useGetPokemonDetailsQuery } from '../../services/api';
import { primaryColor } from '../../utils/colors';
import PokemonInformationItem from '../../components/PokemonInformationItem/PokemonListItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

const PokemonDetailsScreen = ({ navigation }) => {
    const route = useRoute();
    const { pokemon } = route.params;
    const name = capitalize(pokemon.name)
    useEffect(() => {
        navigation.setOptions({ title: name })
    }, [])
    const { data, isLoading, isFetching, isError, error } = useGetPokemonByNameQuery(pokemon?.name);
    if (isLoading || isFetching) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={primaryColor} />
            </View>
        )
    }
    if (isError) {
        return (
            <View style={styles.container}>
                <Text>
                    {JSON.stringify(error)}
                </Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Image
                style={{
                    resizeMode: 'contain',
                    width: 300,
                    height: 300
                }}
                source={{ uri: data?.sprites.front_default }}
            />
            <PokemonInformationItem
                label='Name'
                value={name}
            />
            <PokemonInformationItem
                label='Height'
                value={`${data.height} cm`}
            />
            <PokemonInformationItem
                label='Weight'
                value={`${data.weight / 10} Kg`}
            />
            <PokemonInformationItem
                label='Types'
                value={data.types.map(item => capitalize(item.type.name))}
            />
        </View>
    );
};

export default PokemonDetailsScreen;