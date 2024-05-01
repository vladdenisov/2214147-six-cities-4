import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES_DATA } from '../../const';
import { City, Offer } from '../../types';
import { State } from '../../types/State';

export interface OffersStore {
  city: City;
  offersList: Offer[];
  isLoading: boolean;
}

const initialState: OffersStore = {
  city: CITIES_DATA[0],
  offersList: [],
  isLoading: true,
};

export const offers = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
    changeOffersList(state, action: PayloadAction<Offer[]>) {
      state.offersList = action.payload;
    },
    changeLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { changeCity, changeOffersList, changeLoadingStatus } = offers.actions;

export const selectCity = (state: State) => state.offers.city;
export const selectOffersList = (state: State) => state.offers.offersList;
export const selectOffersLoadingStatus = (state: State) => state.offers.isLoading;

export const offersReducer = offers.reducer;
