import { View, Text, Pressable, Image } from "react-native";
import { Pokemon } from "../models/pokemon_model";
import { StyleSheet } from "react-native";

export default function PokemonCard(props: {pokemon: Pokemon}) {
    return (
        <Pressable style={styles.card} onPress={() => console.log(`${props.pokemon.name} clicked`)}>
            <Image source={{ uri: props.pokemon.sprites.front_default! }} style={{ width: 100, height: 100 }} />
            <Text style={styles.name}> {'#' + props.pokemon.id} </Text>
            <Text style={styles.name}> {props.pokemon.name} </Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    card: {
        width: "47%",
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center'
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: 'center', // Added to center the text within its container
    },
});
