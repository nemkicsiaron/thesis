import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label } from "reactstrap";
import PostList from "../components/PostList";
import { listAllCategories } from "../components/services/CategoryServices";
import { findPost, listAllPosts } from "../components/services/PostsServices";
import Post from "../interfaces/post";

const ServerViewPage = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [categories, setCategories] = React.useState<string[]>(["Minden kategória"]);
    const [category, setCategory] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [minPrice, setMinPrice] = React.useState("");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [server, setServer] = React.useState("");

    const toggle = () => setDropdownOpen(prevState => !prevState);

    React.useEffect(() => {
        (async () => {
            setCategories([...categories, ...await listAllCategories()]);
        })();

        return () => {};
    }, []);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setServer(decodeURIComponent(params.get("server") ?? "ERROR"))
    }, []);

    React.useEffect(() => {
        console.log(posts)
    }, [posts]);

    React.useEffect(() => {
        if(!server)
            return;
        if(searchTerm.trim() && category.trim() &&
           (Number.parseInt(minPrice.trim()) >= 0) &&
           (Number.parseInt(maxPrice.trim()) >= 0 || maxPrice.trim() === "")) {
            console.log("Prices:", minPrice,maxPrice);
            (async () => {
                console.log("Server:", server);
                const goodposts = await findPost(searchTerm.trim(), category, minPrice, maxPrice, "", server);
                console.log("Posts:", goodposts);
                setPosts(goodposts);
                setIsLoading(false);
            })();
        }
        else {
            (async () => {
                const goodposts = await listAllPosts(server);
                console.log("Posts:", goodposts);
                setPosts(goodposts);
                setIsLoading(false);
            })();
        }
        return () => {};
    }, [isLoading, server]);

    return <>{server && (
        <div className="main-page">
            <h1> Szerver </h1>
            <p className="server-addr"> {server} </p>
            <Form>
                <Input type="text" value={searchTerm} className="search-input" onChange={(value) => setSearchTerm(value.target.value)} placeholder="Cím" />
                <Dropdown className="category-dropdown" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>{category || "Kategóriák"}</DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem header>Talált kategóriák</DropdownItem>
                        {
                            categories?.map(cat => (
                                <DropdownItem key={cat} onClick={() => setCategory(cat)}><p>{cat}</p></DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Input type="number" value={minPrice} className="price-input" onChange={(value) => setMinPrice(value.target.value)} placeholder="Minimális ár" />
                <Input type="number" value={maxPrice} className="price-input" onChange={(value) => setMaxPrice(value.target.value)} placeholder="Maximális ár" />
            </Form>
            <Button type="button" onClick={() => setIsLoading(true)} className="btn list-btn" color="success" size="lg">Hirdetés keresése</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
            <Label className="error-label">{isLoading ? "Hirdetések betöltése folyamatban!" : null}</Label>
            <PostList posts={posts} isViewed={false} isOwn={false} prev="/posts" />
        </div>
    )}</>;
};

export default ServerViewPage;