import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppSMSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppSMDispatch = useDispatch.withTypes<AppDispatch>();
