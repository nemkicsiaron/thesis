import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedOut, LoginContext } from "../components/contexts/LoginProvider";
import IUser from "../interfaces/user";

export class Loading {}
export class Idle {}
export class Loaded<T> {
    constructor(public readonly value: T) {}
}
export class Failed<T> {
    constructor(public readonly error: T) {}
}

export type Status<T,U> = Loading | Idle | Loaded<T> | Failed<U>;

export const useLogin = (): [ Status<IUser,Error>, (user: IUser) => void ] => {
    const [status, setStatus] = useState<Status<IUser,Error>>(new Idle());
    const { loginDispatch } = useContext(LoginContext);
    const login = useCallback((user: IUser) => {
        setStatus(new Loading());
        loginDispatch({ type: "login", user: user });
        setStatus(new Loaded(user));
    }, []);
    return [status, login];
}

export const useLogout = (): [ Status<boolean,Error>, () => void ] => {
    const [status, setStatus] = useState<Status<boolean,Error>>(new Idle());
    const { loginState, loginDispatch } = useContext(LoginContext)
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        if(loginState instanceof LoggedOut) {
            setStatus(new Failed(new Error('Cannot log out without being logged in')));
            return;
        }
        setStatus(new Loading());
        loginDispatch({ type: "logout" });
        navigate('/profile');
        setStatus(new Loaded(true));
    }, []);
    return [ status, logout ];
}
