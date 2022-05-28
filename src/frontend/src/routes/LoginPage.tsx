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
    const [file, setFile] = React.useState<File | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginStatus instanceof Failed) {
            window.alert(`Nem sikerült bejelentkezni: ${loginStatus.error}`);
        } else if (loginStatus instanceof Loaded) {
            sessionStorage.setItem("user", JSON.stringify(loginStatus.value));
            navigate("/profile");
        }
    }, [loginStatus, navigate]);

    const handleFile = () => {
        if(file == null || !file) throw new Error("Fájl kiválasztása kötelező!");
        else if(!file.name.endsWith("ppem") || (file.type !== "text/plain;charset=utf-8" && file.type !== "" )) throw new Error(`Hibás fájlformátum: ${file.type}`);
        else if(file.size > 1024 * 1024 * 10) throw new Error("Túl nagy fájlméret!");
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const data = reader.result ?? "";
            const lines = data.toString().split("\n").filter(line => line.trim().length > 0);
            setPasswordhash(lines[1]);

            if(hashCode(password).toString() !== passwordhash) throw new Error("Hibás jelszó!");

            if( lines[2] === "-----BEGIN PUBLIC KEY-----" &&
                lines[4] === "-----END PUBLIC KEY-----" &&
                lines[5] === "-----BEGIN PRIVATE KEY-----" &&
                lines[7] === "-----END PRIVATE KEY-----") {
                    setDummyuser({ username: lines[0], publickey: lines[3], privatekey: lines[6] });
            }
            else {
                throw new Error("A betöltött fájl nem tartalmaz minden szükséges infót!")
            }
        }
        reader.onerror = error => {
            console.error(error);
        }
    }

    const handleSubmit = (u: IUser) => {
        try {
            if(password.trim().length === 0) throw new Error("Nincs jelszó!");
            if(password.length < 6) throw new Error("A jelszónak legalább 6 karakter hosszúnak kell lennie!");
            handleFile();
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
        } catch (error: any) {
            window.alert(error.message);
            return;
        }

    }

    return (
        <div className="main-page">
            <h1>Bejelentkezés</h1>
            <Input type="file" onChange={(e) => { e.target.files ? setFile(e.target.files[0]) : setFile(null) }} />
            <Input type="password" placeholder="Jelszó" onChange={(value) => setPassword(value.target.value)} />
            <p><br /><a href="/info" target="_blank" referrerPolicy="same-origin">Segítségre van szüksége a bejelentkezéshez?</a></p>
            <Button type="button" className="btn" color="success" size="lg" onClick={() => {handleSubmit(dummyuser)}}>Bejelentkezés</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
)};

export default LoginPage;