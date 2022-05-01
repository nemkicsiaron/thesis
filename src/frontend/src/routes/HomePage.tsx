import { Link } from "react-router-dom";
import {Button, ListGroup} from "reactstrap";
import "./styles/Home.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div className="main-page">
            <div className="intro-text">
                <h1>PEER-TO-PEER <br /> PIAC <br /> PORTÁL</h1>
                <br />
                <blockquote>Hogy az internet újkorában is élvezhető legyen a cserekereskedelem!</blockquote>
                <Button type="button" className="btn scrolldown" href="#home-list">👇</Button>
            </div>
            <div className="btn-list">
                <ListGroup id='home-list'>
                    <Button type="button" className="btn list-btn" color="primary" size="lg" tag={Link} to="/servers">Szerverek megtekintése</Button>
                    <Button type="button" className="btn list-btn" color="primary" size="lg" tag={Link} to="/posts">Hirdetések megtekintése</Button>
                    <Button type="button" className="btn list-btn" color="info" size="lg" tag={Link} to="/profile">Profil megtekintése</Button>
                    <Button type="button" className="btn list-btn" color="info" size="lg" tag={Link} to="/info">Több infó a projektről</Button>
                </ListGroup>
            </div>
        </div>
    );
};

export default Home;