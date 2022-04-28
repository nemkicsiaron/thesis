import { Button, Form, Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import useRegister from "../hooks/UserHooks";
import React from "react";

import "./styles/Register.scss";
/*
class PasswordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PasswordError";
    }
}*/

const RegisterPage = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordcontrol, setPasswordcontrol] = React.useState("");
    const useRegisterHook: any = useRegister();
    const onSubmit = () => {
        if(password !== passwordcontrol) {
            window.alert("A jelszavak nem egyeznek!");
            return
            //throw new PasswordError("Passwords do not match");
        }
        useRegisterHook.register(password, (pubkey: string, privkey: string) => {
            console.log("success");
            const a = document.createElement("a");
            const file = new Blob([username + "\n\n" + pubkey + "\n\n" + privkey ], { type: "text/plain" });
            a.href = URL.createObjectURL(file);
            a.download = ".userdata.pem";
            a.click();
            URL.revokeObjectURL(a.href);
            window.alert("Sikeres regisztráció!");
        });
    };

    return (
        <div className="register-page">
            <h1> Regisztráció </h1>
            <Form className="register-form">
            <Input type="text" value={username} onChange={(value) => setUsername(value.target.value)} placeholder="Felhasználónév" />
            <InputGroup className="password-group">
                <Input type="password" value={password} onChange={(value) => setPassword(value.target.value)} placeholder="Jelszó" />
                <Input type="password" value={passwordcontrol} onChange={(value) => setPasswordcontrol(value.target.value)} placeholder="Jelszó megerősítése" />
            </InputGroup>
            </Form>
            <Button type="submit" onClick={onSubmit} className="btn list-btn" color="success" size="lg">Profil létrehozása</Button>
            <Button type="button" className="btn list-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
};

export default RegisterPage;