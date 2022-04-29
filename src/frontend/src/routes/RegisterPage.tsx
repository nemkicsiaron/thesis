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
    const onSubmit = async () => {
        if(password !== passwordcontrol) {
            window.alert("A jelszavak nem egyeznek!");
            return;
            //throw new PasswordError("Passwords do not match");
        }
        if(!username) {
            window.alert("Nem adtál meg felhasználónevet!");
            return;
        }

        const newuser = await useRegisterHook.register(password, (pubkey: string, privkey: string) => {
            console.log("successful registration");

            const a = document.createElement("a");
            document.body.appendChild(a);
            const file = new Blob([username + "\n\n" + pubkey + "\n\n" + privkey ], { type: "text/plain;charset=utf-8" });
            a.href = URL.createObjectURL(file);
            a.download = ".userdata.pem";
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        });

        window.alert(newuser.message);
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