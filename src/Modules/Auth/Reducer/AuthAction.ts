import { RootState, AppThunk } from '../../../Services/Store/Store';
import { incrementByAmount } from './AuthSlice';


//data from store 
export const selectCount = (state: RootState) => state.auth.value;

//dispatch a function
export const incrementIfOdd = (amount: number): AppThunk =>
    (dispatch, getState) => {
        console.log(amount, "amount")
        const currentValue = selectCount(getState());
        if (currentValue !== 0) { dispatch(incrementByAmount(amount)); }
    }
