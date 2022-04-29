import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, ListGroup, ListGroupItem } from "reactstrap";
import Post from "../interfaces/post";

import "./styles/Posts.scss";

const PostsPage = () => {
    const dummyPost: Post = {
        title: "dummytitle",
        category: "dummycategory",
        publish: true,
        price: "420",
        description: "dummydescription",
        created: new Date(),
        author: "dummyauthor",
        signature: "dummysignature"
    }
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [isErrorLoading, setIsErrorLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    async function loadPosts() {
        setIsLoading(true)
        try {
            setPosts([]);
        } catch (error) {
            console.log(error);
            window.alert(error);
            setIsErrorLoading(true);
        } finally {
            setIsLoading(false);
            setPosts(posts.concat(dummyPost));
        }
    }

    return (
        <div className="posts-page">
            <h1> Hirdetések </h1>
            <Button type="button" onClick={loadPosts} className="btn list-btn" color="success" size="lg">Szerverek betöltése</Button>
            <Label className="error-label">{isLoading ? "Szerverek betöltése folyamatban!" : ""}</Label>
            <ListGroup>
            {   (posts).map(post => (
                        <ListGroupItem key={post.title}>
                        <Button type="button" className="btn" id="server-list-btn" color="success" size="lg" tag={Link} to="/:thatpost">Megtekintés</Button>
                        </ListGroupItem>
            ))}
            </ListGroup>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
}

export default PostsPage;