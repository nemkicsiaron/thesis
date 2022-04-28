import React from "react";
import { Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import IServer from "../interfaces/servers";

import "./styles/Servers.scss";

const ServersPage = () => {
    const dummy: IServer = {
        address: "http://dummyaddress.com:2000",
        categories: [],
        lastactive: new Date()
    }

    const servers: IServer[] = [dummy];
    return (
        <div className="servers-page">
            <h1>Servers</h1>
            <ListGroup>
            {
                servers.map(server => (
                        <ListGroupItem className="d-flex">
                            <strong>{server.address}</strong>
                            <Button type="button" className="btn" color="success" size="lg" tag={Link} to="/:thatserver">megtekintés</Button>
                        </ListGroupItem>
            ))}
            </ListGroup>
            <Button type="button" className="btn list-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
};

export default ServersPage;