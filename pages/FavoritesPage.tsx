import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import PokemonCard from '../components/pokemon_card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Pokemon } from '../models/pokemon_model';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesPage({ navigation }: Props) {
    const { favorites } = useFavorites();

    function navigateToDetails(pokemon: Pokemon) {
        navigation.navigate('Detail', { pokemonName: pokemon.name });
    }

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Você ainda não tem Pokémon favoritos.</Text>
                <Text style={styles.emptyText}>Adicione alguns para vê-los aqui!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.name}
                numColumns={2}
                style={styles.list}
                contentContainerStyle={{ paddingVertical: 8 }}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.cardContainer} 
                        onPress={() => navigateToDetails(item)}
                    >
                        <PokemonCard pokemon={item} />
                    </TouchableOpacity>
                )}
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
        width: '50%',
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
    },
});