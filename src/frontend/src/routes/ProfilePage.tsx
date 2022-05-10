import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ListGroup } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Profile.scss";
import { Failed } from "../hooks/LoginHooks";
import LoginProvider, { LoggedIn, LoginContext } from "../components/contexts/LoginProvider";



const ProfilePage: React.FC = () => {
    const {loginState} = useContext(LoginContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginState instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginState.error}`)
        }
    }, [loginState]);

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
                <ListGroup className="mt-4 btn-list">
                    <Button type="button" className="btn list-btn" color="success" size="lg" tag={Link} to="/register" >Regisztrálás</Button>
                    <Button type="submit" className="btn list-btn" color="success" size="lg" tag={Link} to="/login">Profil betöltése</Button>
                    <Button type="button" className="btn list-btn" color="info" size="lg" onClick={() => manage()}>Hirdetések kezelése</Button>
                    <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
                </ListGroup>
            </div>
        </LoginProvider>
    );
}

export default ProfilePage;