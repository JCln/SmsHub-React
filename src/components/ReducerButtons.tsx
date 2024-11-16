import React, { useReducer } from "react";

const initialState = { rValue: true };
type State = { rValue: boolean; };
type Action = { type: "one" | "two" | "three" };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "one":
            return { rValue: true };
        case "two":
            return { rValue: false };
        case "three":
            return { rValue: false };
    }
}

export const ReducerButtons = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            {state?.rValue && <h1>Visible</h1>}
            <button onClick={() => dispatch({ type: "one" })}>Action One</button>
            <button onClick={() => dispatch({ type: "two" })}>Action Two</button>
            <button onClick={() => dispatch({ type: "three" })}>Action Three</button>
        </div>
    );
};