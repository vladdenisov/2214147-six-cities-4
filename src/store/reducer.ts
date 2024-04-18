import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../types';
import { changeCity, changeOffersList } from './action';
import { CITIES_DATA } from '../const';
import { TMP_OFFERS } from '../mocks/offers';

interface StoreState {
  city: City;
  offersList: Offer[];
}

const initialState: StoreState = {
  city: CITIES_DATA[0],
  offersList: TMP_OFFERS,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffersList, (state, action) => {
      state.offersList = action.payload;
    });
});
