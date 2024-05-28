import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, User } from '../types';
import { ThunkConfig } from './helpers';
import { AuthorizationStatus } from '../const';
import { changeLoadingStatus, changeOffersList } from './offers/offers.store';
import { changeAuthorizationStatus, signIn, signOut } from './user/user.store';
import { addToFavorites, changeFavoritesList, changeFavoritesLoadingStatus, removeFromFavorites } from './favorites/favorites.store';

export const fetchOffers = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffers', async (
  _,
  { extra, dispatch }
) => {
  dispatch(changeLoadingStatus(true));
  const response = await extra.get<Offer[]>('/offers');
  dispatch(changeOffersList(response.data));
  dispatch(changeLoadingStatus(false));
});

export const checkAuth = createAsyncThunk<void, undefined, ThunkConfig>('auth/checkAuth', async (
  _,
  { extra, dispatch }
) => {
  const response = await extra.get<User>('/login');
  if (response.status === 401) {
    dispatch(signOut());
    dispatch(changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
  } else {
    dispatch(signIn(response.data));
    dispatch(changeAuthorizationStatus(AuthorizationStatus.LOGGINED));
  }
});

export const fetchFavorites = createAsyncThunk<void, undefined, ThunkConfig>('favorites/fetchFavorites', async (
  _,
  { extra, dispatch }
) => {
  dispatch(changeFavoritesLoadingStatus(true));
  const response = await extra.get<Offer[]>('/favorite');
  dispatch(changeFavoritesLoadingStatus(false));
  if (response.status === 200) {
    dispatch(changeFavoritesList(response.data));
  }
});

export const changeOfferFavoriteStatus = createAsyncThunk<boolean, { id: string; status: boolean}, ThunkConfig>('favorites/changeOfferFavoriteStatus', async (
  { id, status },
  { extra, dispatch }
) => {
  const response = await extra.post<Offer>(`/favorite/${id}/${status ? 1 : 0}`, {});
  if (response.status === 201) {
    dispatch(addToFavorites(response.data));
    return true;
  }
  if (response.status === 200) {
    dispatch(removeFromFavorites(response.data.id));
    return false;
  }
  return status;
});

export const login = createAsyncThunk<void, { email: string; password: string }, ThunkConfig>('auth/login', async (
  { email, password },
  { extra, dispatch }
) => {
  dispatch(changeAuthorizationStatus(AuthorizationStatus.LOADING));
  const response = await extra.post<User>('/login', { email, password });
  if (response.status === 201) {
    dispatch(signIn(response.data));
    if (response.data.token) {
      localStorage.setItem('six-cities-token', response.data.token);
    }
    dispatch(changeAuthorizationStatus(AuthorizationStatus.LOGGINED));
    dispatch(fetchFavorites());
    dispatch(fetchOffers());
  }
});

export const logout = createAsyncThunk<void, undefined, ThunkConfig>('auth/logout', (_, { extra, dispatch }) => {
  extra.delete('/logout');
  dispatch(signOut());
  dispatch(fetchOffers());
  localStorage.removeItem('six-cities-token');
});
