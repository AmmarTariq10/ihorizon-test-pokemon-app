import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { useGetPokemonListQuery } from '../../services/api';
import PokemonListItem from '../../components/PokemonListItem/PokemonListItem';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
    const [page, setPage] = useState(0)
    const [pokemons, setPokemons] = useState([])
    const { data, isLoading, error, isFetching } = useGetPokemonListQuery(page);
    const isEndOfResults = pokemons?.length >= data?.count
    const handleLoadMore = () => {
        !isEndOfResults && setPage(page + 1)

    };
    useEffect(() => {
        if (pokemons?.length > 0 && data?.results && data?.results?.length > 0) {
            setPokemons(pokemons.concat(data.results))
        } else {
            setPokemons(data?.results)
        }
    }, [data?.results])
    return (
        <View style={styles.container}>
            <FlatList
                testID='flat-list'
                style={styles.flatList}
                data={pokemons}
                renderItem={({ item }) => <PokemonListItem pokemon={item} onPress={() => navigation.navigate('PokemonDetailsScreen', { pokemon: item })} />}
                keyExtractor={(item) => item.name}
                onEndReached={handleLoadMore}
                ListFooterComponent={
                    <View style={styles.container}>
                        {isFetching && <ActivityIndicator size="small" color="#007AFF" />}
                        {isLoading && <ActivityIndicator testID='loading-indicator' size="small" color="#007AFF" />}
                        {error && <Text>{error}</Text>}
                    </View>
                }

            />
        </View>
    )
};
export default HomeScreen;