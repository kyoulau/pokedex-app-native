
import { FlatList, StyleSheet, View } from 'react-native';
import { Pokemon, PokemonListResult } from '../models/pokemon_model';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/pokemon_card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { TouchableOpacity } from 'react-native';


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

    function navigateToDetails(pokemon: Pokemon) {
        navigation.navigate('Detail', { pokemonName: pokemon.name });
    }

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0)

    return (
        <View style={styles.container}>
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
        backgroundColor: '#F7F7F7', // Um fundo mais suave
    },
    list: {
        width: '100%',
    },
    cardContainer: {
        width: '50%',      // CADA ITEM OCUPA METADE DA TELA
        padding: 8,        // O ESPAÇAMENTO É CRIADO INTERNAMENTE
    },
});