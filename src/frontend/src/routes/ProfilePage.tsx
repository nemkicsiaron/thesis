import React from "react";
import { Link } from "react-router-dom";
import { Button, ListGroup } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Profile.scss";



const ProfilePage: React.FC = () => {
    const onLogin = () => {
    };
    return (
        <div className="profile-main">
            <ListGroup className="mt-4 btn-list">
                <Button type="button" className="btn list-btn" color="success" size="lg" tag={Link} to="/register" >Regisztrálás</Button>
                <Button type="submit" onClick={onLogin} className="btn list-btn" color="success" size="lg">Profil betöltése</Button>
                <Button type="button" className="btn list-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
            </ListGroup>
        </div>
    );
}

export default ProfilePage;