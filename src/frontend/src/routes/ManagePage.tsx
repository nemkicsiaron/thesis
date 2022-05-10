import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { LoggedIn, LoginContext } from "../components/contexts/LoginProvider";

const ManagePage = () => {
    const {loginState} = React.useContext(LoginContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!(loginState instanceof LoggedIn)) {
            window.alert("Hirdetéseid kezelésehez be kell jelentkezned!");
            navigate("/profile");
            return;
        }
    }, [loginState, navigate]);

    return (
        <div className="main-page">
            {loginState instanceof LoggedIn && (
            <div className="main-page">
                <h1>Hirdetések kezelése</h1>
                <div className="manage-posts">
                    <Button type="button" className="btn back-btn" color="success" size="lg" tag={Link} to="/create">Hirdetés létrehozása</Button>
                    <Button type="button" className="btn back-btn" color="info" size="lg" tag={Link} to="/create">Hirdetéseim megtekintése</Button>
                    <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
                </div>
            </div>
            )}
        </div>
)};

export default ManagePage;