import {configureStore} from '@reduxjs/toolkit';
import { API } from '../services/api';
import { userReducer } from './user/user.store';
import { offersReducer } from './offers/offers.store';
import { favoritesReducer } from './favorites/favorites.store';


export const store = configureStore(
  {
    reducer: {
      offers: offersReducer,
      user: userReducer,
      favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: API,
        },
      })
  }
);
