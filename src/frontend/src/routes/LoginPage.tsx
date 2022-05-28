import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { hashCode, importKeyPair } from "../components/services/UserServices";
import { Failed, Loaded, useLogin } from "../hooks/LoginHooks";
import IUser from "../interfaces/user";

const LoginPage = () => {
    const [loginStatus, login] = useLogin();
    const [password, setPassword] = React.useState("");
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

    const handleError = (error: string) => {
        //console.error(error);
        window.alert(error);
    }

    const handleFile = (): any => {
        var u: IUser = {username: "", publickey: "", privatekey: ""};
        if(file == null || !file){
            handleError("Fájl kiválasztása kötelező!");
            return;
        }
        else if(!file.name.endsWith("ppem") || (file.type !== "text/plain;charset=utf-8" && file.type !== "" )) {
            handleError(`Hibás fájlformátum: ${file.type}`);
            return;
        }
        else if(file.size > 1024 * 1024 * 10) {
            handleError("Túl nagy fájlméret!");
            return;
        }

        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const data = reader.result ?? "";
            const lines = data.toString().split("\n").filter(line => line.trim().length > 0);

            if(isNaN(parseInt(lines[1]))) {
                handleError("Hibás fájlformátum vagy adatok!");
                return;
            }

            if(hashCode(password).toString() !== lines[1]){
                console.log(`Hibás jelszó: ${hashCode(password)} (${password}) nem ${lines[1]}`);
                handleError("Hibás jelszó!");
                return;
            }

            if( lines[2] === "-----BEGIN PUBLIC KEY-----" &&
                lines[4] === "-----END PUBLIC KEY-----" &&
                lines[5] === "-----BEGIN PRIVATE KEY-----" &&
                lines[7] === "-----END PRIVATE KEY-----") {
                    u = { username: lines[0], publickey: lines[3], privatekey: lines[6] };
            } else {
                handleError("Hibás fájlformátum vagy adatok!");
                return;
            }
        }
        reader.onloadend = () => {
            if(u.username.length <= 0 || u.publickey.length <= 0 || u.privatekey.length <= 0) return;
            importKeyPair(u.publickey, u.privatekey).then((keys) => {
                console.log(u);
                if(keys) login(u);
                else {
                    console.log(keys);
                    handleError("Hibás kulcsok!");
                    return;
                }
            });
        }
    }

    const handleSubmit = () => {
        if(password.trim().length === 0){
            handleError("Nincs jelszó!");
            return;
        }
        if(password.length < 6) {
            handleError("A jelszónak legalább 6 karakter hosszúnak kell lennie!");
            return;
        }
        handleFile();
}

    return (
        <div className="main-page">
            <h1>Bejelentkezés</h1>
            <Input type="file" onChange={(e) => { e.target.files ? setFile(e.target.files[0]) : setFile(null); }} />
            <Input type="password" placeholder="Jelszó" onChange={(value) => setPassword(value.target.value)} />
            <p><br /><a href="/info" target="_blank" referrerPolicy="same-origin">Segítségre van szüksége a bejelentkezéshez?</a></p>
            <Button type="button" className="btn" color="success" size="lg" onClick={() => {handleSubmit()}}>Bejelentkezés</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
)};

export default LoginPage;