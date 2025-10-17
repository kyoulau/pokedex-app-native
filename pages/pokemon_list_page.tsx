
import { FlatList, StyleSheet, View, Text, TextInput,Alert } from 'react-native';
import { Pokemon, PokemonListResult } from '../models/pokemon_model';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/pokemon_card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { TouchableOpacity } from 'react-native';
import { useLayoutEffect } from 'react'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function PokemonListPage({ navigation }: Props) {
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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <Text style={styles.headerButtonText}>Favoritos ★</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    function navigateToDetails(pokemon: Pokemon) {
        navigation.navigate('Detail', { pokemonName: pokemon.name });
    }

    const [searchQuery, setSearchQuery] = useState('');
    async function handleSearch() {
        const formattedQuery = searchQuery.trim().toLowerCase();
        
        if (!formattedQuery) {
            Alert.alert("Busca vazia", "Por favor, digite o nome ou número de um Pokémon.");
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedQuery}`);
            
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }

            const data = await response.json();
            const foundPokemon = Pokemon.fromJson(data);
            
            navigation.navigate('Detail', { pokemonName: foundPokemon.name });
            setSearchQuery('');

        } catch (error) {
            Alert.alert("Erro", "Pokémon não encontrado. Verifique o nome ou número e tente novamente.");
        }
    }

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0)

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nome ou número"
                    value={searchQuery}
                    onChangeText={setSearchQuery} 
                    onSubmitEditing={handleSearch} 
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
            numColumns={2}
            style={styles.list}
            contentContainerStyle={{ paddingVertical: 8 }}
            data={pokemon ? pokemon : []}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigateToDetails(item)}>
                        <PokemonCard pokemon={item} />
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 20}} />}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    const newOffset = offset + infinityScrollSize;
                    fetchPokemons(newOffset);
                    setOffset(newOffset);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7', 
    },
    list: {
        width: '100%',
    },
    cardContainer: {
        width: '66%',    
        padding: 10,       
    },
    headerButtonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton:{
        height: 40,
        backgroundColor: '#bedbf6ff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    searchButtonText: {
        fontSize: 16,
        color: '#000000ff',
        fontWeight: '600',
    }
});