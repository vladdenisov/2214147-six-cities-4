import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, State } from '../types/State';
import { AxiosInstance } from 'axios';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export interface ThunkConfig {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}
