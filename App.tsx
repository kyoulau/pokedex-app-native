import { FavoritesProvider } from './contexts/FavoritesContext';
import PokemonListPage from './pages/pokemon_list_page';
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonDetailPage from './pages/pokemon_detail_page';
import FavoritesPage from './pages/FavoritesPage';
const stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Detail: { pokemonName: string };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
      <FavoritesProvider>
                <NavigationContainer>
            <stack.Navigator>
              <Stack.Screen name='Home'>
                {props => <PokemonListPage {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Detail">
                  {(props) => <PokemonDetailPage {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Favorites" component={FavoritesPage} options={{ title: 'Meus Favoritos' }} />
            </stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    )
}