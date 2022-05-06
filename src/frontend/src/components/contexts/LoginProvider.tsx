import React from "react";
import IUser from "../../interfaces/user";

export class LoggedOut {}
export class LoggedIn {
    constructor(readonly user: IUser) {}
}
export type LoginState = LoggedOut | LoggedIn;

export interface LoginContextType {
    loginState: LoginState;
    loginDispatch: React.Dispatch<LoginAction>;
}

export type LoginAction =
    | { type: 'login', user: IUser }
    | { type: 'logout' };

export const LoginContext = React.createContext<LoginContextType>({
    loginState: new LoggedOut(),
    loginDispatch: () => null,
});

const reducer = (state: LoginState, action: LoginAction): LoginState => {
    switch(action.type) {
        case 'login':
            return new LoggedIn(action.user);
        case 'logout':
            return new LoggedOut();
        default:
            return state;
    };
};

export default ({ children }: { children: React.ReactNode }) => {
    const [loginState, loginDispatch] = React.useReducer(reducer, new LoggedOut());

    return (
        <LoginContext.Provider value={{ loginState, loginDispatch }}>
            {children}
        </LoginContext.Provider>
    )
}
