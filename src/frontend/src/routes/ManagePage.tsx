import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { LoggedIn, LoginContext } from "../components/contexts/LoginProvider";
import { Failed } from "../hooks/LoginHooks";

const ManagePage = () => {
    const {loginState} = React.useContext(LoginContext);

    return (
        <div className="main-page">
            <h1>Hirdetések kezelése</h1>
            <div className="manage-posts">
                <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
            </div>
        </div>
)};

export default ManagePage;