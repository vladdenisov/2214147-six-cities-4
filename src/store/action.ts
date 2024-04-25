import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City, Offer } from '../types';
import { ThunkConfig } from './helpers';

export const changeCity = createAction<City>('offers/changeCity');

export const changeOffersList = createAction<Offer[]>('offers/changeOffersList');

export const changeLoadingStatus = createAction<boolean>('offers/changeLoadingStatus');

export const fetchOffers = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffers', async (
  _,
  { extra, dispatch }
) => {
  dispatch(changeLoadingStatus(true));
  const response = await extra.get<Offer[]>('/offers');
  dispatch(changeOffersList(response.data));
  dispatch(changeLoadingStatus(false));
});
