import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES_DATA, SortOptions } from '../../const';
import { City, Offer } from '../../types';
import { State } from '../../types/State';

export interface OffersStore {
  city: City;
  offersList: Offer[];
  isLoading: boolean;
  sortOption: SortOptions;
}

const initialState: OffersStore = {
  city: CITIES_DATA[0],
  offersList: [],
  isLoading: true,
  sortOption: SortOptions.POPULAR,
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
    changeSortOption(state, action: PayloadAction<SortOptions>) {
      state.sortOption = action.payload;
    },
    changeSpecificOfferFavoriteStatus(state, action: PayloadAction<{id: string; status: boolean}>) {
      const offer = state.offersList.find((item) => item.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.status;
      }
    }
  },
});

export const { changeCity, changeOffersList, changeLoadingStatus, changeSortOption, changeSpecificOfferFavoriteStatus } = offers.actions;

export const selectCity = (state: State) => state.offers.city;
export const selectOffersList = (state: State) => state.offers.offersList;
export const selectOffersLoadingStatus = (state: State) => state.offers.isLoading;
export const selectSortOption = (state: State) => state.offers.sortOption;

export const offersReducer = offers.reducer;
