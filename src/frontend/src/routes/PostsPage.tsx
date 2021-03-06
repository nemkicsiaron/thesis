import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label } from "reactstrap";
import PostList from "../components/PostList";
import { listAllCategories } from "../components/services/CategoryServices";
import { findPost, listAllPosts } from "../components/services/PostsServices";
import Post from "../interfaces/post";
import containsSpecialChars from "../util/containsSpecialChars";

import "./styles/Posts.scss";
// const dummyPost: Post = {
//     title: "dummytitle",
//     category: "dummycategory",
//     published: true,
//     price: "420",
//     description: "dummydescription",
//     created: new Date(),
//     author: "dummyauthor",
//     signature: "dummysignature - " + Math.random().toString(36).substring(7)
// }

const PostsPage = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [categories, setCategories] = React.useState<string[]>(["Minden kategória"]);
    const [category, setCategory] = React.useState(categories[0]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [minPrice, setMinPrice] = React.useState("0");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    React.useEffect(() => {
        (async () => {
            setCategories([...categories, ...await listAllCategories()]);
        })();

        return () => {};
    }, []);

    React.useEffect(() => {
        if(searchTerm.trim() && category.trim() &&
           (Number.parseInt(minPrice.trim()) >= 0) &&
           (Number.parseInt(maxPrice.trim()) >= 0 || maxPrice.trim() === "")) {
            console.log("Prices:", minPrice,maxPrice);
            (async () => {
                const goodposts = await findPost(searchTerm.trim(), category, minPrice, maxPrice, "");
                console.log("Posts:", goodposts);
                setPosts(goodposts);
                setIsLoading(false);
            })();
        }
        else {
            (async () => {
                const goodposts = await listAllPosts();
                console.log("Posts:", goodposts);
                setPosts(goodposts);
                setIsLoading(false);
            })();
        }
        return () => {};
    }, [isLoading]);

    return (
        <div className="main-page">
            <h1> Hirdetések </h1>
            <Form>
                <Input type="text" invalid={containsSpecialChars(searchTerm)} value={searchTerm} className="search-input" onChange={(value) => setSearchTerm(value.target.value)} placeholder="Cím" />
                <FormFeedback>A cím nem lehet üres és nem tartalmazhat speciális karaktereket!</FormFeedback>
                <Dropdown className="category-dropdown" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>{category || "Kategóriák"}</DropdownToggle>
                    <DropdownMenu class="dopdown-menu" end>
                        <DropdownItem header>Talált kategóriák</DropdownItem>
                        {
                            categories?.map(cat => (
                                <DropdownItem key={cat} onClick={() => setCategory(cat)}><p>{cat}</p></DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <div>
                <Input type="number" value={minPrice} className="price-input" onChange={(value) => setMinPrice(value.target.value)} placeholder="Minimális ár" />
                <Input type="number" value={maxPrice} className="price-input" onChange={(value) => setMaxPrice(value.target.value)} placeholder="Maximális ár" />
                </div>
            </Form>
            <Button type="button" onClick={() => setIsLoading(true)} className="btn list-btn" color="success" size="lg">Hirdetés keresése</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
            <Label className="error-label">{isLoading ? "Hirdetések betöltése folyamatban!" : null}</Label>
            <PostList posts={posts} isViewed={false} isOwn={false} prev="/posts" />
        </div>
    );
}

export default PostsPage;