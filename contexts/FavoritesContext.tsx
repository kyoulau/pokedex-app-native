import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Pokemon } from '../models/pokemon_model';

interface FavoritesContextType {
    favorites: Pokemon[];
    addFavorite: (pokemon: Pokemon) => void;
    removeFavorite: (pokemonId: number) => void;
    isFavorite: (pokemonId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Pokemon[]>([]);

    const addFavorite = (pokemon: Pokemon) => {
        if (!favorites.some(fav => fav.id === pokemon.id)) {
            setFavorites(prevFavorites => [...prevFavorites, pokemon]);
        }
    };

    const removeFavorite = (pokemonId: number) => {
        setFavorites(prevFavorites => prevFavorites.filter(pokemon => pokemon.id !== pokemonId));
    };

    const isFavorite = (pokemonId: number) => {
        return favorites.some(pokemon => pokemon.id === pokemonId);
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};