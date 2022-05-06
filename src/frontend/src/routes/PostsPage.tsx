import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, ListGroup, ListGroupItem } from "reactstrap";
import { listAllCategories } from "../components/services/CategoryServices";
import { findPost, listAllPosts } from "../components/services/PostsServices";
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
        signature: "dummysignature - " + Math.random().toString(36).substring(7)
    }
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [categories, setCategories] = React.useState<string[]>(["Minden kategória"]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [minPrice, setMinPrice] = React.useState("0");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    React.useEffect(() => {
        listAllCategories().then(cats =>{ setCategories([...categories, ...cats]);});
    }, []);

    React.useEffect(() => {
        if(searchTerm.trim() || category.trim() ||
           (minPrice.trim() && minPrice.trim() !== "0") ||
           (maxPrice.trim() && maxPrice.trim() !== "0")) {
            console.log("Prices:", minPrice,maxPrice)
            findPost(searchTerm.trim(), category, minPrice, maxPrice).then(goodposts => {
                setPosts(goodposts);
            }).catch(error => {
                console.log(error);
                window.alert(error);
            }).finally(() => {
                console.log("Posts found successfully!");
                setIsLoading(false);
            });
        }
        else {
            listAllPosts().then(allposts => {
                setPosts(allposts.concat(dummyPost));
            }).catch(error => {
                console.log(error);
                window.alert(error);
            }).finally(() => {
                console.log("Posts loaded successfully!");
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    return (
        <div className="main-page">
            <h1> Hirdetések </h1>
            <Form>
            <Input type="text" value={searchTerm} className="search-input" onChange={(value) => setSearchTerm(value.target.value)} placeholder="Cím" />
            <Dropdown className="category-dropdown" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{category || "Kategóriák"}</DropdownToggle>
                <DropdownMenu end>
                    <DropdownItem header>Talált kategóriák</DropdownItem>
                    {
                        categories.map(category => (
                            <DropdownItem key={category} onClick={() => setCategory(category)}>{category}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <Input type="number" value={minPrice} className="price-input" onChange={(value) => setMinPrice(value.target.value)} placeholder="Minimális ár" />
            <Input type="number" value={maxPrice} className="price-input" onChange={(value) => setMaxPrice(value.target.value)} placeholder="Maximális ár" />
            </Form>
            <Button type="button" onClick={() => setIsLoading(true)} className="btn list-btn" color="success" size="lg">Hirdetés keresése</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
            <Label className="error-label">{isLoading ? "Hirdetések betöltése folyamatban!" : null}</Label>
            <ListGroup className="postlist-group">
            {   (posts).map(post => (
                        <ListGroupItem className="lg-item" key={post.signature}>
                                <div>
                                <p>
                                    <strong>{post.title}</strong>
                                    <br />
                                    {post.category}
                                    <br />
                                    {post.description}
                                    <br />
                                    {post.price} Ft
                                    <br />
                                    {post.author}
                                    <br />
                                    {post.signature}
                                </p>
                                <Button type="button" className="btn" id="post-list-btn" color="success" size="lg" tag={Link} to="/:thatpost">Megtekintés</Button>
                                </div>
                        </ListGroupItem>
            ))}
            </ListGroup>
        </div>
    );
}

export default PostsPage;