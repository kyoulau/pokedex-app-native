import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Pokemon, PokemonListResult } from './models/pokemon_model';
import { useEffect, useState } from 'react';
import PokemonCard from './components/pokemon_card';

// Removed unused 'api' constant

export default function App() {
    const infinityScrollSize = 20

    async function fetchPokemon(poke: PokemonListResult) {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.Name}`);
        const data = await resp.json();
        const pokemon = Pokemon.fromJson(data);
        return pokemon;
    }
    
    async function fetchPokemons(offset: number) {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${infinityScrollSize}`);
        const data = await resp.json();
        const newPokemons = await Promise.all(
            data.results.map(async (pokemon: any) => await fetchPokemon(PokemonListResult.fromJson(pokemon)))
        );
        setPokemon((pokemons) => [...pokemons, ...newPokemons]);
    }

    useEffect(() => {
        setPokemon([])
        fetchPokemons(0)
        setOffset(infinityScrollSize)
    }, []);

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0)

    return (
        <View style={styles.container}>
            <FlatList
            numColumns={2}
            style={styles.list}
            data={pokemon ? pokemon : []}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <PokemonCard pokemon={item} />}
            contentContainerStyle={{
                paddingHorizontal: 10,
            }}
            columnWrapperStyle={{
                justifyContent: "space-between",
            }}

            onEndReachedThreshold={0.5}
            onEndReached={() => {
                setOffset((prev) => prev + 20);
                fetchPokemons(offset)
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '100%',
        backgroundColor: '#fff',
    },
});
