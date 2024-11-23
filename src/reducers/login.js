import React from 'react'
import * as Types from '../constants/ActionTypes';

const initialState = {
    count: 0
}

export default function counterReducer(state = initialState, action) {
    if (action.type === Types.Increment) {
        return {
            count: state.count + 1
        };
    }
    return state;
}