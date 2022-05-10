import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import hashCode from "../components/services/UserServices";
import { Failed, useLogin, useLogout } from "../hooks/LoginHooks";
import IUser from "../interfaces/user";

const LoginPage = () => {
    const [loginState, login] = useLogin();
    const [logoutState, logout] = useLogout();
    const [password, setPassword] = React.useState("");
    const [passwordhash, setPasswordhash] = React.useState("");
    const [dummyuser, setDummyuser] = React.useState({ username: "", publickey: "" , privatekey: "" });
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginState instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginState.error}`);
        }
    }, [loginState]);

    React.useEffect(() => {
        if(logoutState instanceof Failed) {
            window.alert(`Nem sikerült kijelentkezni: ${logoutState.error}`);
        }
    }, [logoutState]);

    const handleFile = (e: any) => {
        const file: File = e.target.files[0];
        if(!file.name.endsWith("ppem") || file.size > 4240 || (file.type !== "text/plain;charset=utf-8" && file.type !== "" )) {
            window.alert(`Hibás fájlformátum: ${file.type}`);
            return;
        }
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const data = reader.result ?? "";
            const lines = data.toString().split("\n").filter(line => line.trim().length > 0);
            setPasswordhash(lines[1]);
            if( lines[2] === "-----BEGIN PUBLIC KEY-----" &&
                lines[4] === "-----END PUBLIC KEY-----" &&
                lines[5] === "-----BEGIN PRIVATE KEY-----" &&
                lines[7] === "-----END PRIVATE KEY-----") {
                    setDummyuser({ username: lines[0], publickey: lines[3], privatekey: lines[6] });
            }
        }
        reader.onerror = error => {
            console.error(error);
        }
    }

    const handleSubmit = (u: IUser) => {
        if(!u.username.trim() || !u.publickey.trim() || !u.privatekey.trim()) {
            window.alert("A feltöltött fájl nem tartalmaz minden szükséges infót!")
            console.log(u);
            return;
        }
        if(hashCode(password).toString() !== passwordhash){
            window.alert("Hibás jelszó!");
            return;
        }

        login(u);
        navigate("/profile");
    }

    return (
        <div className="main-page">
            <h1>Bejelentkezés</h1>
            <Input type="file" onChange={handleFile}/>
            <Input type="password" placeholder="Jelszó" onChange={(value) => setPassword(value.target.value)} />
            <Button type="button" className="btn" color="success" size="lg" onClick={() => {handleSubmit(dummyuser)}}>Bejelentkezés</Button>
            <Button type="button" className="btn" color="success" size="lg" onClick={() => {logout()}}>Kijelentkezés</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
)};

export default LoginPage;