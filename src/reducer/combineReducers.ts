import { AnyAction, Reducer } from "redux";
import { Record } from "immutable";

export type ReducerMap<TState> = Record.Factory<{
    [P in keyof TState]: (state: TState[P], action: AnyAction) => TState[P];
}>;

const checkInvocation = <TState>(state: TState, reducerNames: string[], action: AnyAction) => {
    if (process.env.NODE_ENV === "production") {
        return;
    }

    const stateName = action && action.type === "@@redux/INIT"
        ? "initialState argument passed to createStore"
        : "previous state received by the reducer";

    if (!Record.isRecord(state)) {
        throw new TypeError(`The ${stateName} should be an instance of Immutable.Record with the following properties ${reducerNames.join(", ")}`);
    }

    if (!reducerNames.length) {
        throw new Error(`Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers`);
    }
};

export const combineReducers = <TState>(reducers: ReducerMap<TState>): Reducer => {
    const reducerRecord = new reducers();
    const reducerKeys   = Object.keys(reducerRecord.toJS);

    const defaultState = reducerRecord.withMutations((temporaryState) => {
        reducerKeys.forEach((reducerName: any) => {
            temporaryState.set(reducerName, null);
        })
    });

    return (inputState = defaultState, action: AnyAction): TState => {
        checkInvocation(inputState, reducerKeys, action);

        return inputState.withMutations((temporaryState: typeof inputState) => {
           reducerKeys.forEach((reducerName: any) => {
               const reducer = reducerRecord.get(reducerName, undefined);

               const currentState = temporaryState.get(reducerName, undefined);
               const nextState    = reducer(currentState ? currentState : undefined, action);

               temporaryState.set(reducerName, nextState);
           });
        });
    };
};
