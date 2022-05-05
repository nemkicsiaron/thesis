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
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        listAllServers().then(allservers => {
            setServers(allservers.concat(dummyServer));
        }).catch(error => {
            console.log(error);
            window.alert(error);
        }).finally(() => {
            console.log("Servers loaded successfully!");
            setIsLoading(false);
        });
    }, [isLoading]);

    return (
        <div className="main-page">
            <h1>Szerverek</h1>
            <Button type="button" onClick={() => setIsLoading(true)} className="btn list-btn" color="success" size="lg">Szerverek betöltése</Button>
            <Button type="button" className="btn back-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
            <Label className="error-label">{isLoading ? "Szerverek betöltése folyamatban!" : ""}</Label>
            <ListGroup>
            {   (servers).map(server => (
                        <ListGroupItem className="lg-item" key={server.address}>
                            <strong>{server.address}</strong>
                            <p>{server.lastactive.toString()}</p>
                            <Button type="button" className="btn" id="server-list-btn" color="success" size="lg" tag={Link} to="/:thatserver">Megtekintés</Button>
                        </ListGroupItem>
            ))}
            </ListGroup>
        </div>
    );
};

export default ServersPage;