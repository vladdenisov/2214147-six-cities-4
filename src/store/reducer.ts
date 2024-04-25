import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../types';
import { changeCity, changeLoadingStatus, changeOffersList } from './action';
import { CITIES_DATA } from '../const';

interface StoreState {
  city: City;
  offersList: Offer[];
  isLoading: boolean;
}

const initialState: StoreState = {
  city: CITIES_DATA[0],
  offersList: [],
  isLoading: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(changeLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    });
});
