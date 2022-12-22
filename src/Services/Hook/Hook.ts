import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from '../Store/Store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRouting = (path: string) => {
    const navigate = useNavigate();
    navigate(path);
}