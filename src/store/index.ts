import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import { API } from '../services/api';


export const store = configureStore({reducer, middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: API,
    },
  })});
