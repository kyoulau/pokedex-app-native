import { StyleSheet } from 'react-native';
import PokemonListPage from './pages/pokemon_list_page';
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonDetailPage from './pages/pokemon_detail_page';
import { Pokemon } from './models/pokemon_model';
const stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Detail: { pokemonName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <stack.Navigator>
              <Stack.Screen name='Home'>
                {props => <PokemonListPage {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Detail">
                  {(props) => <PokemonDetailPage {...props} />}
                </Stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    )
}