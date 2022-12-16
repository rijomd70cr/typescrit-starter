import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../Services/Hook/Hook';
import { incrementIfOdd, selectCount } from '../Reducer/AuthAction';

const Sample = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    return (
        <div>
            <p>{count}</p>
            <p onClick={() => dispatch(incrementIfOdd(count))}>Increment</p>
        </div>
    )
}

export default Sample;