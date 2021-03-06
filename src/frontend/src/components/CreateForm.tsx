import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input } from "reactstrap";
import { Failed, Idle, useLogin } from "../hooks/LoginHooks";
import { useCreate, useUpdate } from "../hooks/UserHooks";
import Post from "../interfaces/post";
import IServer from "../interfaces/servers";
import containsSpecialChars from "../util/containsSpecialChars";
import { LoggedIn, LoggedOut, LoginContext } from "./contexts/LoginProvider";
import { listAllCategories } from "./services/CategoryServices";
import listAllServers from "./services/ServerServices";
import { importPrivateKey } from "./services/UserServices";

const CreateForm = ({oldpost, edit}: {oldpost: Post | null, edit: boolean}) => {
    const {loginState} = React.useContext(LoginContext);
    const [loginStatus, login] = useLogin();
    const navigate = useNavigate();
    const [newPost, setNewPost] = React.useState<Post>();
    const [dummyTitle, setDummyTitle] = React.useState(oldpost?.title ?? "");
    const [dummyContent, setDummyContent] = React.useState(oldpost?.description ?? "");
    const [dummyPrice, setDummyPrice] = React.useState(oldpost?.price ?? "");
    const [dummyPublish, setDummyPublish] = React.useState(oldpost?.published ?? true);
    const [servers, setServers] = React.useState<IServer[]>([]);
    const [server, setServer] = React.useState<IServer>();
    const [categories, setCategories] = React.useState<string[]>([]);
    const [category, setCategory] = React.useState(oldpost?.category ?? "");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [cdropdownOpen, setCDropdownOpen] = React.useState(false);
    const ctoggle = () => setCDropdownOpen(prevState => !prevState);
    const useCreateHook: any = useCreate();
    const useUpdateHook: any = useUpdate();

    React.useEffect(() => {
        if(loginStatus instanceof Failed) {
            window.alert(`Nem siker??lt bejelentkezni: ${loginStatus.error}`)
        } else if(loginState instanceof LoggedOut && loginStatus instanceof Idle) {
            try {
                let user = JSON.parse(sessionStorage.getItem("user")?.toString() ?? "");
                if(loginStatus instanceof Idle && user) login(user);

            } catch {
                window.alert("Hirdet??seid kezel??sehez be kell jelentkezned!");
                navigate("/profile");
            }
        }
    }, [loginState, loginStatus, login, navigate]);

    React.useEffect(() => {
        (async () => {
            setServers([...await listAllServers()]);
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
                    window.alert("Nem v??lasztott??l szervert!");
                    return;
                }
                if(!category){
                    window.alert("Nem v??lasztott??l kateg??ri??t!");
                    return;
                }
                if(!dummyTitle.trim() || !dummyPrice.trim()) {
                    window.alert("Minden sz??ks??ges mez??t ki kell t??lteni!");
                    return;
                }

                var error: boolean = false;
                var message: string = "";
                if(edit){
                    const edited = await useUpdateHook.update(newPost, server.address, oldpost?.signature ?? "error");
                    error = edited.error;
                    message = edited.message;

                } else {
                    const created = await useCreateHook.create(newPost, server.address);
                    error = created.error;
                    message = created.message;
                }
                window.alert(message);

                if(!error) navigate("/manage");

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
                        let signature = await window.crypto.subtle.sign({name: "RSA-PSS", saltLength: 32}, key, new TextEncoder().encode(dummyTitle + dummyContent));
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

    };

    return (
        <>
            {loginState instanceof LoggedIn && (
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
                            <DropdownToggle caret>{category || "Kateg??ria"}</DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem header>El??rhet?? kateg??ri??k</DropdownItem>
                                {
                                    categories.map(category => (
                                        <DropdownItem key={category} onClick={() => setCategory(category)}>{category}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Input invalid={dummyTitle.trim().length <= 0 || containsSpecialChars(dummyTitle)} valid type="text" value={dummyTitle} className="title-input" onChange={(value) => setDummyTitle(value.target.value)} placeholder="C??m" />
                        <FormFeedback>A c??m nem lehet ??res ??s nem tartalmazhat speci??lis karaktereket!</FormFeedback>
                        <Input invalid={Number.parseInt(dummyPrice) < 0 || dummyPrice.trim().length <= 0} valid type="number" value={dummyPrice} className="price-input" onChange={(value) => setDummyPrice(value.target.value)} placeholder="??r" />
                        <FormFeedback>Az ??r pozit??v vagy 0 kell legyen!</FormFeedback>
                        <Input type="textarea" invalid={dummyContent.length > 2000} valid value={dummyContent} className="description-input" onChange={(value) => setDummyContent(value.target.value)} placeholder="Le??r??s" />
                        <FormFeedback>A le??r??s maximum 2000 karakter hossz?? lehet! (Jelenleg {dummyContent.length})</FormFeedback>
                        <Input type="checkbox" checked={dummyPublish} onChange={(value) => setDummyPublish(value.target.checked)} /> Publikus
                    </Form>
                    <Button type="button" onClick={handleSubmit} className="btn list-btn" color="success" size="lg">Ok</Button>
                    <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/manage">M??gsem</Button>
                </div>
            )}
        </>
    )};

    export default CreateForm;