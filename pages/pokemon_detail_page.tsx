import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; 
import { useEffect, useState } from 'react';
import { Pokemon } from '../models/pokemon_model';

// 1. Tipamos as props para receber 'route' e 'navigation'
type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function PokemonDetailPage({ route, navigation }: Props) {

    const { pokemonName } = route.params;

    const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemonDetails() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();
                const detailedPokemon = Pokemon.fromJson(data); 
                setPokemonDetails(detailedPokemon);
            } catch (error) {
                console.error("Falha ao buscar detalhes do Pokémon:", error);
                // Aqui você poderia adicionar um estado para exibir um erro na tela
            } finally {
                setIsLoading(false); 
            }
        }

        fetchPokemonDetails();
        navigation.setOptions({ title: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) });
    }, [pokemonName]);


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!pokemonDetails) {
        return (
            <View style={styles.centered}>
                <Text>Não foi possível carregar os dados do Pokémon.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{ uri: pokemonDetails.sprites.other?.['official-artwork'].front_default || pokemonDetails.sprites.front_default! }}
            />
            
            <Text style={styles.name}>{pokemonDetails.name}</Text>
            <Text style={styles.pokedexNumber}>Nº {pokemonDetails.id}</Text>

            <View style={styles.infoSection}>
                <Text style={styles.title}>Tipos</Text>
                <View style={styles.tagsContainer}>
                    {pokemonDetails.types.map((typeInfo) => (
                        <Text key={typeInfo.type.name} style={[styles.tag, styles.typeTag]}>
                            {typeInfo.type.name}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.title}>Habilidades</Text>
                <View style={styles.tagsContainer}>
                    {pokemonDetails.abilities
            .filter(abilityInfo => abilityInfo.ability) 
            .map((abilityInfo) => (
                <Text key={abilityInfo.ability?.name} style={[styles.tag, styles.abilityTag]}>
                    {abilityInfo.ability?.name}
                </Text>
            ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginTop: 10,
    },
    pokedexNumber: {
        fontSize: 20,
        color: '#666',
        marginBottom: 20,
    },
    infoSection: {
        width: '100%',
        marginTop: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        fontSize: 16,
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 15,
        margin: 4,
        textTransform: 'capitalize',
        overflow: 'hidden', 
    },
    typeTag: {
        backgroundColor: '#789EF9', 
    },
    abilityTag: {
        backgroundColor: '#FA9844',
    }
});