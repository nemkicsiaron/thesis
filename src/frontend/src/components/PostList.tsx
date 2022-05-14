import { Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import Post from "../interfaces/post";

const LinkPost = (post: Post) => {
    return post.signature ? "/" + "post" + "/" + post.signature : "/not-found";
}

const PostList = ({posts}: {posts: Post[]}) => {
    return (
        <ListGroup className="postlist-group">
            {   posts?.map(post => (
                        <ListGroupItem className="lg-item" key={post.signature}>
                                <div>
                                <p>
                                    <strong>{post.title}</strong>
                                    <br />
                                    Kategória: {post.category}
                                    <br />
                                    Leírás: {post.description}
                                    <br />
                                    Ár: {post.price} Ft
                                    <br />
                                    Feladó: {post.author}
                                    <br />
                                    Aláírás: {post.signature}
                                </p>
                                <Button type="button" className="btn" id="post-list-btn" color="success" size="lg" tag={Link} to={LinkPost(post)}>Megtekintés</Button>
                                </div>
                        </ListGroupItem>
            ))}
            </ListGroup>
    );
}

export default PostList;