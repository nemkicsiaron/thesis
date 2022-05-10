import React from "react";
import { useNavigate } from "react-router-dom";
import { LoggedIn, LoginContext } from "../components/contexts/LoginProvider";

const CreatePage = () => {
    const {loginState} = React.useContext(LoginContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!(loginState instanceof LoggedIn)) {
            window.alert("Hirdetések létrehozásához be kell jelentkezned!");
            navigate("/profile");
            return;
        }
    }, [loginState, navigate]);
    return (
        <div className="main-page">
            {loginState instanceof LoggedIn && (
                <div className="main-page">
                    <h1>Hirdetések létrehozása</h1>
                    <div className="manage-posts">
                    </div>
                </div>
            )}
        </div>
    )};

    export default CreatePage;