import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ListGroup } from "reactstrap";
import { Failed, Idle, useLogin, useLogout } from "../hooks/LoginHooks";
import LoginProvider, { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";

import "./styles/Profile.scss";



const ProfilePage: React.FC = () => {
    const {loginState} = useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const [logoutState, logout] = useLogout();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginStatus instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginStatus.error}`)
        } else if(loginState instanceof LoggedOut && loginStatus instanceof Idle) {
            try {
                let user = JSON.parse(sessionStorage.getItem("user")?.toString() ?? "");
                if(loginStatus instanceof Idle && user) login(user);
            } catch {
            }
        }
    }, [loginState, loginStatus, login]);

    React.useEffect(() => {
        if(logoutState instanceof Failed) {
            window.alert(`Nem sikerült kijelentkezni: ${logoutState.error}`)
        }
    }, [logoutState]);

    const manage = () => {
        if(!(loginState instanceof LoggedIn)) {
            window.alert("Hirdetéseid kezelésehez be kell jelentkezned!");
            return;
        }
        navigate("/manage");
    }

    return (
        <LoginProvider>
            <div className="main-page">
                <h1>Profil</h1>
                <div className="profile">
                    <h3>Felhasználónév:
                    {
                        loginState instanceof LoggedIn && (
                            <> {loginState.user.username}</>
                    )}
                    </h3>
                    <h3>Nyilvános kulcs:</h3>
                    {
                        loginState instanceof LoggedIn && (
                            <p>{loginState.user.publickey}</p>
                    )}

                    <h3>Privát kulcs:</h3>
                    {
                        loginState instanceof LoggedIn && (
                            <> {loginState.user.privatekey.length ? "Sikeresen betöltve" : "Nincs betöltve"}</>
                    )}
                </div>
                    {
                        loginState instanceof LoggedOut && (
                            <ListGroup className="mt-4 btn-list">
                                <Button type="submit" className="btn list-btn" color="success" size="lg" tag={Link} to="/login">Profil betöltése</Button>
                                <Button type="button" className="btn list-btn" color="info" size="lg" tag={Link} to="/register" >Regisztrálás</Button>
                                <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
                            </ListGroup>
                    )}
                    {
                        loginState instanceof LoggedIn && (
                        <ListGroup className="mt-4 btn-list">
                            <Button type="button" className="btn list-btn" color="success" size="lg" onClick={() => manage()}>Hirdetések kezelése</Button>
                            <Button type="button" className="btn back-btn" color="info" size="lg" onClick={logout}>Kijelentkezés</Button>
                            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
                        </ListGroup>
                    )}
            </div>
        </LoginProvider>
    );
}

export default ProfilePage;