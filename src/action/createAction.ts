import { addType } from "./cache";

//======
// Types
//======
export interface Serializable {
    toString(): string;
}

export interface Action<P> {
    type:    string;
    payload: P;
}

export interface ActionCreator extends Serializable {
    (): Action<undefined>;
}
export interface ActionCreator1<Arg1, P> extends Serializable {
    (arg1: typeof Arg1): Action<P>;
}
export interface ActionCreator2<Arg1, Arg2, P> extends Serializable {
    (arg1: Arg1, arg2: Arg2): Action<P>;
}
export interface ActionCreator3<Arg1, Arg2, Arg3, P> extends Serializable {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3): Action<P>;
}
export interface ActionCreator4<Arg1, Arg2, Arg3, Arg4, P> extends Serializable {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4): Action<P>;
}
export interface ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P> extends Serializable {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5): Action<P>;
}
export interface ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P> extends Serializable {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6): Action<P>;
}

export type PayloadReducer1<Arg1, P> = (arg1: Arg1) => P;
export type PayloadReducer2<Arg1, Arg2, P> = (arg1: Arg1, arg2: Arg2) => P;
export type PayloadReducer3<Arg1, Arg2, Arg3, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3) => P;
export type PayloadReducer4<Arg1, Arg2, Arg3, Arg4, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => P;
export type PayloadReducer5<Arg1, Arg2, Arg3, Arg4, Arg5, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => P;
export type PayloadReducer6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => P;

//===============
// Action Creator
//===============
export function createAction(type: string): ActionCreator;
export function createAction<Arg1, P>(type: string, payloadReducer?: PayloadReducer1<Arg1, P>): ActionCreator1<Arg1, P>;
export function createAction<Arg1, Arg2, P>(type: string, payloadReducer?: PayloadReducer2<Arg1, Arg2, P>): ActionCreator2<Arg1, Arg2, P>;
export function createAction<Arg1, Arg2, Arg3, P>(type: string, payloadReducer?: PayloadReducer3<Arg1, Arg2, Arg3, P>): ActionCreator3<Arg1, Arg2, Arg3, P>;
export function createAction<Arg1, Arg2, Arg3, Arg4, P>(type: string, payloadReducer?: PayloadReducer4<Arg1, Arg2, Arg3, Arg4, P>): ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>;
export function createAction<Arg1, Arg2, Arg3, Arg4, Arg5, P>(type: string, payloadReducer?: PayloadReducer5<Arg1, Arg2, Arg3, Arg4, Arg5, P>): ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>;
export function createAction<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(type: string, payloadReducer?: PayloadReducer6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>) : ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P> {
    addType(type);

    const actionCreator = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => {
        const payload = (typeof payloadReducer === "function")
            ? payloadReducer(arg1, arg2, arg3, arg4, arg5, arg6)
            : {} as P;

        return {
            type,
            payload,
        };
    };

    actionCreator.toString = () => type;

    return actionCreator;
}
