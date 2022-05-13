import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input } from "reactstrap";
import { LoggedIn, LoggedOut, LoginContext } from "../components/contexts/LoginProvider";
import { listAllCategories } from "../components/services/CategoryServices";
import listAllServers from "../components/services/ServerServices";
import { importPrivateKey } from "../components/services/UserServices";
import { Failed, Idle, useLogin } from "../hooks/LoginHooks";
import { useCreate } from "../hooks/UserHooks";
import Post from "../interfaces/post";
import IServer from "../interfaces/servers";

const CreatePage = () => {
    const {loginState} = React.useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const navigate = useNavigate();
    const [newPost, setNewPost] = React.useState<Post>();
    const [dummyTitle, setDummyTitle] = React.useState("");
    const [dummyContent, setDummyContent] = React.useState("");
    const [dummyPrice, setDummyPrice] = React.useState("");
    const [dummyPublish, setDummyPublish] = React.useState(true);
    const [servers, setServers] = React.useState<IServer[]>([]);
    const [server, setServer] = React.useState<IServer>();
    const [categories, setCategories] = React.useState<string[]>([]);
    const [category, setCategory] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [cdropdownOpen, setCDropdownOpen] = React.useState(false);
    const ctoggle = () => setCDropdownOpen(prevState => !prevState);
    const useCreateHook: any = useCreate();

    React.useEffect(() => {
        if(loginState instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginState.error}`)
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
        (async () => {
            setServers(await listAllServers());
            console.log("Servers loaded successfully: " + servers);
        })();

        return () => {};
    }, []);

    React.useEffect(() => {
        (async () => {
            setCategories([...await listAllCategories(server?.address ?? "")]);
            console.log("Categories: " + categories)
        })();

        return () => {};
    }, [server]);

    React.useEffect(() => {
        if(newPost) {
            (async () => {
                if(!server){
                    window.alert("Nem választottál szervert!");
                    return;
                }
                if(!category){
                    window.alert("Nem választottál kategóriát!");
                    return;
                }
                const create = useCreateHook.create(newPost, server.address);
                if(create.error) window.alert(`Hirdetés létrehozása sikertelen: ${create.message}`);
                else {
                    window.alert("Hirdetés létrehozása sikeres!");
                    navigate("/manage");
                }

            })();
        }
        return () => {};
    }, [newPost]);

    const handleSubmit = () => {
        if(loginState instanceof LoggedIn) {
            var dummyPost: Post = {
                title: dummyTitle,
                category: category,
                published: dummyPublish,
                price: dummyPrice,
                description: dummyContent,
                created: new Date(),
                author: loginState.user.username,
            };
            (async () => {
                try{
                    let key = await importPrivateKey(loginState.user.privatekey)
                    if(key) {
                        let signature = await window.crypto.subtle.sign({name: "RSA-PSS", saltLength: 32}, key, new TextEncoder().encode(dummyPost.title + dummyContent))
                        dummyPost.signature = window.btoa(String.fromCharCode.apply(null, [...new Uint8Array(signature)]));
                        dummyPost.created = new Date();
                        setNewPost(dummyPost);
                    }
                } catch(error) {
                    console.log(error);
                    window.alert(error);
                };
            })();
            return () => {};
        }

    }

    return (
        <div className="main-page">
            {loginState instanceof LoggedIn && (
                <div className="main-page">
                    <h1>Hirdetés létrehozása</h1>
                    <div className="manage-posts">
                        <Form>
                            <Dropdown className="category-dropdown" isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle caret>{server?.address || "Szerver"}</DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem header>Szerver</DropdownItem>
                                    {
                                        servers.map(server => (
                                            <DropdownItem key={server.address} onClick={() => setServer(server)}>{server.address}</DropdownItem>
                                            ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown className="category-dropdown" isOpen={cdropdownOpen} toggle={ctoggle}>
                                <DropdownToggle caret>{category || "Kategória"}</DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem header>Elérhető kategóriák</DropdownItem>
                                    {
                                        categories.map(category => (
                                            <DropdownItem key={category} onClick={() => setCategory(category)}>{category}</DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Input invalid={dummyTitle.length <= 0} type="text" value={dummyTitle} className="search-input" onChange={(value) => setDummyTitle(value.target.value)} placeholder="Cím" />
                            <FormFeedback>A cím nem lehet üres!</FormFeedback>
                            <Input invalid={Number.parseInt(dummyPrice) < 0} type="number" value={dummyPrice} className="price-input" onChange={(value) => setDummyPrice(value.target.value)} placeholder="Ár" />
                            <FormFeedback>Az ár nem lehet negatív!</FormFeedback>
                            <Input type="textarea" value={dummyContent} className="description-input" onChange={(value) => setDummyContent(value.target.value)} placeholder="Leírás" />
                            <Input type="checkbox" checked={dummyPublish} onChange={(value) => setDummyPublish(value.target.checked)} /> Publikus
                        </Form>
                        <Button type="button" onClick={handleSubmit} className="btn list-btn" color="success" size="lg">Létrehozás</Button>
                        <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/manage">Mégsem</Button>
                    </div>
                </div>
            )}
        </div>
    )};

    export default CreatePage;