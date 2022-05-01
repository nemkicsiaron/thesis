import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, ListGroup, ListGroupItem } from "reactstrap";
import listAllServers from "../components/services/ServerServices";
import IServer from "../interfaces/servers";

import "./styles/Servers.scss";

const ServersPage = () => {
    const dummyServer: IServer = {
        address: "dummyaddress",
        categories: [],
        lastactive: new Date()
    }
    const [servers, setServers] = React.useState<IServer[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    async function loadServers() {
        setIsLoading(true)
        try {
            setServers(await listAllServers());
        } catch (error) {
            console.log(error);
            window.alert(error);
        } finally {
            setIsLoading(false);
            setServers(servers.concat(dummyServer));
        }
    }
    return (
        <div className="main-page">
            <h1>Szerverek</h1>
            <Button type="button" onClick={loadServers} className="btn list-btn" color="success" size="lg">Szerverek betöltése</Button>
            <Label className="error-label">{isLoading ? "Szerverek betöltése folyamatban!" : ""}</Label>
            <ListGroup>
            {   (servers).map(server => (
                        <ListGroupItem key={server.address}>
                        <strong>{server.address}</strong>
                        <p>{server.lastactive.toString()}</p>
                        <Button type="button" className="btn" id="server-list-btn" color="success" size="lg" tag={Link} to="/:thatserver">Megtekintés</Button>
                        </ListGroupItem>
            ))}
            </ListGroup>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
};

export default ServersPage;