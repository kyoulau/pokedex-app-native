import { StyleSheet } from 'react-native';
import PokemonListPage from './pages/pokemon_list_page';
import { NavigationContainer } from '@react-navigation/native';


import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="Home" component={PokemonListPage} />
            </stack.Navigator>
        </NavigationContainer>
    )
}