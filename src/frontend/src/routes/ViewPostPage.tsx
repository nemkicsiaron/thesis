import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LoginProvider, { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";
import { Failed, Idle, useLogin } from "../hooks/LoginHooks";
import Post from "../interfaces/post";

const ViewPostPage = () => {
    const [viewPost, setViewPost] = React.useState<Post>()
    const {loginState} = React.useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const navigate = useNavigate();

    const isOwn = () => {
        if(!(loginState instanceof LoggedIn)) {
            //window.alert("Hirdetéseid kezelésehez be kell jelentkezned!");
            return;
        } else if(loginState.user.username === viewPost?.author) {
            return true;
        }
        return false;
    }

    React.useEffect(() => {
        if(loginState instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginState.error}`)
        } else if(loginState instanceof LoggedOut && loginStatus instanceof Idle) {
            try {
                let user = JSON.parse(sessionStorage.getItem("user")?.toString() ?? "");
                if(loginStatus instanceof Idle && user) login(user);

            } catch(error) {
                // window.alert("Hirdetéseid kezelésehez be kell jelentkezned!");
                // navigate("/profile");
                console.error(error)
            }
        }
    }, [loginState, loginStatus, login, navigate]);

    return (
        <LoginProvider>
        <div className="main-page">
            <h1>Hirdetés</h1>
            <div className="post-container">
                <div className="post-content">
                    <p>{viewPost?.title}</p>
                </div>
            </div>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
        </LoginProvider>
    )
}

export default ViewPostPage;