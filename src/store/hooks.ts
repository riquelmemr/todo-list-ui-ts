import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '.'; // Of store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useDispatch > create a dispatch function of actions to be executed a modified state
// const dispatch = useAppDispatch();
// dispatch(updateUser({ ... }));

// useSelector > reponsible for accessing the state of the store, and returning a value
// const allUsers = useApp Selector((state: RootState) => state.users);
