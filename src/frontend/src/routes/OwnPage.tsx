import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label} from "reactstrap";
import LoginProvider, { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";
import PostList from "../components/PostList";
import { listAllCategories } from "../components/services/CategoryServices";
import { findOwnPost } from "../components/services/PostsServices";
import { Failed, Idle, useLogin } from "../hooks/LoginHooks";
import Post from "../interfaces/post";

const OwnPage = () => {
    const {loginState} = React.useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const navigate = useNavigate();
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [categories, setCategories] = React.useState<string[]>(["Minden kategória"]);
    const [category, setCategory] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [minPrice, setMinPrice] = React.useState("0");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    React.useEffect(() => {
        if(loginStatus instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginStatus.error}`)
        } else if(loginState instanceof LoggedOut && loginStatus instanceof Idle) {
            try {
                let user = JSON.parse(sessionStorage.getItem("user")?.toString() ?? "");
                if(loginStatus instanceof Idle && user) login(user);

            } catch {
                window.alert("Hirdetéseid megtekintéséhez be kell jelentkezned!");
                navigate("/profile");
            }
        }
    }, [loginState, loginStatus, login, navigate, posts]);

    React.useEffect(() => {
        (async () => {
            setCategories([...categories, ...await listAllCategories()]);
            //console.log(categories)
        })();

        return () => {};
    }, []);

    React.useEffect(() => {
        if(loginState instanceof LoggedIn) {
            (async () => {
                const goodposts = await findOwnPost(searchTerm.trim(), category, minPrice, maxPrice, loginState.user, "");
                setPosts(goodposts);
                setIsLoading(false);
            })()
        } else {
            try {
                let user = JSON.parse(sessionStorage.getItem("user")?.toString() ?? "");
                console.log(loginState, loginStatus);
                if(loginStatus instanceof Idle && user) login(user);
                setIsLoading(false);
            } catch {
                console.log(loginState, loginStatus);
                window.alert("Hirdetéseid megtekintéséhez be kell jelentkezned!");
                navigate("/profile");
            }
        }

        return () => {};
    }, [isLoading]);

    return (
        <LoginProvider>
        <div className="main-page">
            <h1>Saját Hirdetések</h1>
            { loginState instanceof LoggedIn && posts && (
            <>
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
            <PostList posts={posts} isViewed={false} isOwn={true} prev="/own" />
            </>
            )}
        </div>
        </LoginProvider>
    );
}

export default OwnPage;