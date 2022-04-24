import React from "react";
import './styles/NotFound.scss';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const NotFoundPage = () => {
    return (
        <div>
            <h1 className="notFoundTitle">404 - A keresett oldal nem található</h1>
            <Button type="button" className="btn list-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
}

export default NotFoundPage;