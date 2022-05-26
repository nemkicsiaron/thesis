import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { hashCode, importKeyPair } from "../components/services/UserServices";
import { Failed, Loaded, useLogin } from "../hooks/LoginHooks";
import IUser from "../interfaces/user";

const LoginPage = () => {
    const [loginStatus, login] = useLogin();
    const [password, setPassword] = React.useState("");
    const [passwordhash, setPasswordhash] = React.useState("");
    const [dummyuser, setDummyuser] = React.useState({ username: "", publickey: "" , privatekey: "" });
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginStatus instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginStatus.error}`);
        } else if (loginStatus instanceof Loaded) {
            sessionStorage.setItem("user", JSON.stringify(loginStatus.value));
            navigate("/profile");
        }
    }, [loginStatus, navigate]);

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
            window.alert("A betöltött fájl nem tartalmaz minden szükséges infót!")
            console.log(u);
            return;
        }
        if(hashCode(password).toString() !== passwordhash){
            window.alert("Hibás jelszó!");
            return;
        }

        importKeyPair(u.publickey, u.privatekey).then((keys) => {
            if(keys) login(u);
            else {
                window.alert("Hibás kulcsok!");
                console.log(keys);
            }
        }).catch(error => {
            console.log(error);
            window.alert(error);
        });
    }

    return (
        <div className="main-page">
            <h1>Bejelentkezés</h1>
            <Input type="file" onChange={handleFile}/>
            <Input type="password" placeholder="Jelszó" onChange={(value) => setPassword(value.target.value)} />
            <p><br /><a href="/info" target="_blank" referrerPolicy="same-origin">Segítségre van szüksége a bejelentkezéshez?</a></p>
            <Button type="button" className="btn" color="success" size="lg" onClick={() => {handleSubmit(dummyuser)}}>Bejelentkezés</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
)};

export default LoginPage;