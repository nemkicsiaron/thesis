import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ListGroup } from "reactstrap";
import { Failed, useLogout } from "../hooks/LoginHooks";
import LoginProvider, { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";

import "./styles/Profile.scss";



const ProfilePage: React.FC = () => {
    const {loginState} = useContext(LoginContext);
    const [logoutState, logout] = useLogout();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginState instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginState.error}`)
        }
    }, [loginState]);

    React.useEffect(() => {
        if(logoutState instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${logoutState.error}`)
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
                    <h2>Felhasználónév:
                    {
                        loginState instanceof LoggedIn && (
                            <h3>{loginState.user.username}</h3>
                    )}
                    </h2>
                    <h2>Nyilvános kulcs:</h2>
                    {
                        loginState instanceof LoggedIn && (
                            <p>{loginState.user.publickey}</p>
                    )}

                    <h2>Privát kulcs:</h2>
                    {
                        loginState instanceof LoggedIn && (
                            <p>{loginState.user.privatekey.length ? "Sikeresen betöltve" : "Nincs betöltve"}</p>
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