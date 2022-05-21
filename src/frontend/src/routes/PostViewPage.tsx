import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LoginProvider, { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";
import PostList from "../components/PostList";
import { findOwnPost, findPost, verifyPost } from "../components/services/PostsServices";
import { Failed, Idle, useLogin } from "../hooks/LoginHooks";
import Post from "../interfaces/post";

import "./styles/ViewPost.scss";

const PostViewPage = () => {
    const [viewPost, setViewPost] = React.useState<Post>({
        title: "",
        description: "",
        price: "0",
        category: "",
        author: "",
        signature: "",
        created: new Date(),
        published: false,
    })
    const {loginState} = React.useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const navigate = useNavigate();
    const [uri, setUri] = React.useState<string>();
    const [isOwn, setIsOwn] = React.useState<boolean>(false);

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

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setUri(decodeURIComponent(params.get("post") ?? ""));
    }, []);

    React.useEffect(() => {
        if(!uri) return () => {};
        (async () => {
            let post = await findPost("", "", "", "", uri);
            if(loginState instanceof LoggedIn && (!post || post.length === 0)){
                post = await findOwnPost("", "", "", "", loginState.user, uri);
                console.log("He owns this post!");
            }
            if(post.length === 1) setViewPost(post[0]);
            else console.log("Not found")//navigate("/notfound");
        })();
        return () => {}
    }, [uri, loginState]);

    React.useEffect(() => {
        if(!(loginState instanceof LoggedIn) || !viewPost || loginState.user.username !== viewPost.author ) setIsOwn(false);
        else {
            (async () => {
                if(viewPost.signature){
                    const own = await verifyPost(viewPost.signature, loginState.user.publickey, new TextEncoder().encode(viewPost.title + viewPost.description));
                    console.log("Is this owned:" + own);
                    setIsOwn(own);
                }
            })()
        }
        setIsOwn(false);
        return () => {}
    }, [viewPost]);


    return (
        <LoginProvider>
        <div className="main-page">
            <h1>Hirdetés</h1>
            <div className="post-container">
                <div className="post-content">
                    { viewPost &&
                        <PostList posts={[viewPost]} isViewed={true} isOwn={isOwn} prev={isOwn ? "/own" : "/view"} />
                    }
                </div>
            </div>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
        </LoginProvider>
    )
}

export default PostViewPage;