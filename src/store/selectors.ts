import { State } from '../types/State';

export const selectCurrentCity = (state: State) => state.city;
export const selectOffersList = (state: State) => state.offersList;
export const selectLoadingStatus = (state: State) => state.isLoading;
