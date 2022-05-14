import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LoginProvider, { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";
import { Failed, Idle, useLogin } from "../hooks/LoginHooks";

const ManagePage = () => {
    const {loginState} = React.useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginState instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginState.error}`)
        } else if(loginState instanceof LoggedOut && loginStatus instanceof Idle) {
            try {
                let user = JSON.parse(sessionStorage.getItem("user")?.toString() ?? "");
                if(loginStatus instanceof Idle && user) login(user);

            } catch {
                window.alert("Hirdetéseid kezelésehez be kell jelentkezned!");
                navigate("/profile");
            }
        }
    }, [loginState, loginStatus, login, navigate]);


    return (
        <LoginProvider>
            {loginState instanceof LoggedIn && (
            <div className="main-page">
                <h1>Hirdetések kezelése</h1>
                <div className="manage-posts">
                    <Button type="button" className="btn back-btn" color="success" size="lg" tag={Link} to="/create">Hirdetés létrehozása</Button>
                    <Button type="button" className="btn back-btn" color="info" size="lg" tag={Link} to="/own">Hirdetéseim megtekintése</Button>
                    <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
                </div>
            </div>
            )}
        </LoginProvider>
)};

export default ManagePage;