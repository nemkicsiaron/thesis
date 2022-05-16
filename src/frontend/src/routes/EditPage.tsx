import React from "react";
import { useNavigate } from "react-router-dom";
import { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";
import CreateForm from "../components/CreateForm";
import { findOwnPost, findPost } from "../components/services/PostsServices";
import { Failed, Idle, useLogin } from "../hooks/LoginHooks";
import Post from "../interfaces/post";

const EditPage = () => {
    const [oldpost, setOldpost] = React.useState<Post|null>(null);
    const [uri, setUri] = React.useState<string>();
    const {loginState} = React.useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginStatus instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginStatus.error}`)
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

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setUri(decodeURIComponent(params.get("post") ?? ""));
    }, []);

    React.useEffect(() => {
        if(!uri) return () => {};
        (async () => {
            if(loginState instanceof LoggedIn) {
                let post = await findOwnPost("", "", "", "", loginState.user, uri);
                if(post.length === 1) setOldpost(post[0]);
                else console.log("Not found")//navigate("/notfound");
                console.log(oldpost)
            }
        })();
        return () => {}
    }, [uri, loginState]);

    return (
        <>
            ( oldpost &&
            <div className="main-page">
                <h1>Hirdetés szerkesztése</h1>
                <CreateForm oldpost={oldpost} edit={true}/>
            </div>
            )
        </>
    );
}

export default EditPage;