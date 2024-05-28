import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { State } from '../../types/state';

export interface FavoritesState {
  favorites: Offer[];
  isLoading: boolean;
}

export const initialState: FavoritesState = {
  favorites: [],
  isLoading: true,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    changeFavoritesList(state, action: PayloadAction<Offer[]>) {
      state.favorites = action.payload;
    },
    addToFavorites(state, action: PayloadAction<Offer>) {
      const offer = state.favorites.find((el) => el.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      } else {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((offer) => offer.id !== action.payload);
    },
    changeFavoritesLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  },
});

export const { changeFavoritesList, addToFavorites, removeFromFavorites, changeFavoritesLoadingStatus } = favoritesSlice.actions;

export const selectFavoritesList = (state: State) => state.favorites.favorites;
export const selectFavoritesLoadingStatus = (state: State) => state.favorites.isLoading;
export const selectFavoritesCount = (state: State) => state.favorites.favorites.length;

export const favoritesReducer = favoritesSlice.reducer;
