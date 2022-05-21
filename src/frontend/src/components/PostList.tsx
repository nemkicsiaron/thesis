import { Link, useNavigate } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import Post from "../interfaces/post";
import { deletePost } from "./services/PostsServices";
const PostList = ({posts, isViewed, isOwn, prev}: {posts: Post[], isViewed: boolean, isOwn: boolean, prev: string}) => {
    const navigate = useNavigate();

    const LinkPost = (postsign: string) => {
        return "/view?post=" + encodeURIComponent(postsign);
    }

    const LinkPostEdit = (postsign: string) => {
        return "/edit?post=" + encodeURIComponent(postsign);
    }

    const handleDelete = (post: Post, prev: string) => {
        if(window.confirm("Biztosan törölni szeretnéd ezt a hirdetést?")) {
            (async () => {
                await deletePost(post);
                navigate(prev);
                window.location.reload();
            })()
        }
    }
    return ( posts &&
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
                            <br />
                            Nyilvános: {post.published ? "✔️" : "❌"}
                        </p>
                        {!isViewed &&
                            <Button type="button" className="btn" id="post-list-btn" color="success" size="lg" tag={Link} to={LinkPost(post.signature ?? "notfound")}>Megtekintés</Button>
                        }
                        {isOwn &&
                            <>
                            <Button type="button" className="btn" id="edit-list-btn" color="success" size="lg" tag={Link} to={LinkPostEdit(post.signature ?? "notfound")}>Módosítás</Button>
                            <Button type="button" className="btn" id="delete-list-btn" color="danger" size="lg" onClick={() => {handleDelete(post, prev);}}>Törlés</Button>
                            </>
                        }
                    </div>
                </ListGroupItem>
            ))}
            </ListGroup>
    );
}

export default PostList;