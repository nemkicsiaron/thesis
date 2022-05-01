import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, ListGroup, ListGroupItem } from "reactstrap";
import listAllPosts from "../components/services/PostsServices";
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
    const [isLoading, setIsLoading] = React.useState(false);

    async function loadPosts() {
        setIsLoading(true)
        try {
            setPosts(await listAllPosts());
            while(false)
            {
                console.log("loading");
            }
        } catch (error) {
            console.log(error);
            window.alert(error);
        } finally {
            setIsLoading(false);
            setPosts(posts.concat(dummyPost));
        }
    }

    return (
        <div className="main-page">
            <h1> Hirdetések </h1>
            <Button type="button" onClick={loadPosts} className="btn list-btn" color="success" size="lg">Hirdetések betöltése</Button>
            <Label className="error-label">{isLoading ? "Szerverek betöltése folyamatban!" : ""}</Label>
            <ListGroup>
            {   (posts).map(post => (
                        <ListGroupItem class= "post" key={post.title}>
                            <Label className="post-title strong">{post.title}</Label>
                            <Label className="post-category">{post.category}</Label>
                            <Label className="post-price">{post.price} Ft</Label>
                            <Label className="post-description">{post.description}</Label>
                            <Label className="post-author">{post.author}</Label>
                            <Label className="post-signature">{post.signature}</Label>
                            <Button type="button" className="btn" id="server-list-btn" color="success" size="lg" tag={Link} to="/:thatpost">Megtekintés</Button>
                        </ListGroupItem>
            ))}
            </ListGroup>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
}

export default PostsPage;