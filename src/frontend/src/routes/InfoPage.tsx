import {Link} from "react-router-dom"
import {Button} from "reactstrap"

import "./styles/Info.scss"

const InfoPage = () => {
    return (
        <div className="main-page">
            <span>
                <h1>Információk</h1>
                <h2>Profil kezelése</h2>
                <div className="info-tab">
                    <h3>Regisztráció</h3>
                    <p> FONTOS: A generált bejelentkező-fájlt a felhasználók kötelessége letölteni és biztonságosan tárolni!
                        A még nem regisztrált felhasználók nem tudnak hirdetéseket létrehozni, de a regisztráció bárkinek elérhető a Profil menüben a <Link to="/register">Regisztráció</Link> gombra kattintva.
                        A regisztrációhoz kell egy felhasználónév és egy tűrhetően biztonságos (legalább 6 karakter hosszú) jelszó, mely a feldolgozást biztosítja.
                        A sikeres regisztráció eredménye egy <i>.ppem</i> kiterjesztésű fájl, melyben az RSA kulcs adatai tárolódnak.</p>
                    <h3>Bejelentkezés</h3>
                    <p> Természetesen a <Link to="/login">Bejelentkezés</Link> is a Profil menüben elérhető. A bejelentkezéshez a <i>.ppem</i> kiterjesztésű fájl és a jelszó megadása szükséges.
                    Onnantól a használat ideje alatt a weboldal bejelentkezve tartja a felhasználót. </p>
                    <h3>Kijelentkezés</h3>
                    <p> A kijelentkezéshez elég megnyomni a megfelelő feliratú gombot a <Link to="/profile">Profil kezelése</Link> menüben. </p>
                </div>
                <h2>Hirdetések kezelése</h2>
                <div className="info-tab">
                    <h3>Hirdetések megtekintése</h3>
                    <p> A hirdetések megtekintéséhez nem szükséges bejelentkezve lenni.
                        A nyilvános hirdetéseket a <Link to="/posts">Hirdetések böngészése</Link> vagy a <Link to="/servers">Szerverek böngészése</Link> felületeken keresztül lehet elérni.</p>
                    <h3>Hirdetés létrehozása</h3>
                    <p> A hirdetés létrehozásához a felhasználók bejelentkezve kell legyenek. Onnantól a <Link to="/manage">Hirdetések kezelése</Link> menüpontban található a létrehozás gomb.</p>
                    <h3>Hirdetés módosítása és törlése</h3>
                    <p> A bejelentkezett felhasználók a <Link to="/own">Saját hirdetéseiket</Link> egy helyen tudják megtekinteni ahol kezelhetik is azokat.</p>
                </div>
                <h2>Gyakran Ismételt Kérdések</h2>
                <div className="info-tab">
                    <h3>Mi ez az oldal?</h3>
                    <p> A P2P-PP egy újfajta, biztonság orientált, internet koncepcióbizonyítása.
                        Célja egy letisztult, minimális keretrendszert adni egy fundamentálisan decentralizárt keretrendszernek </p>
                    <h3>Miért kell ezt?</h3>
                    <p> Mert az internet korában született generációk felnövésével, annak egy új korának kell elkövetkeznie,
                        amit meg kísérletezéssel és hasonló innovatív fejleményekkel lehet megalapozni. </p>
                    <h3>Mitől lesz valami Peer-to-Peer?</h3>
                    <p> A Peer-to-Peer (P2P) rendszerek sok - elméletileg végtelen - egymással egyenrangú végpontok hálozata.
                        Jelen esetben ez azt jelenti, hogy az adatok egy tetszőlegesen kihelyezett szerverek hálózatán van elhelyezve.
                        Így a rendszer annyira erős, mint amennyire a mögötte elhelyezkedő támogató közösség. </p>
                    <h3>Hogyan csatlakozhatok én is ehhez a hálozathoz?</h3>
                    <p> Egyszerű! <Link to="..\util\p2p-pp-server.zip" target="_blank" download="server">Letöltöd az adattároló szerver fájljait</Link>, majd a szerver folderében futtatod a következő parancsokat parancssorból:
                    (Amennyiben a letöltés nem működik innen tudod beszerezni az <i>src/server</i> mappát: <Link to="https://github.com/nemkicsiaron/thesis">https://github.com/nemkicsiaron/thesis</Link>)
                        <br/>
                        <code>
                            npm install
                            <br/>
                            set PORT=6969 <strong> (tetszőleges port szám) </strong>
                            <br/>
                            set AGGREGATOR_URI=aggregator.com <strong> (az aggregátor címe, amiről most is olvasol, és amire a szerver csatlakozhat) </strong>
                            <br/>
                            set OWN_URI=sajatszerverem.com <strong> (tetszőleges URL amire kihelyezed a szervert) </strong>
                            <br/>
                            npx prisma migrate reset
                            <br/>
                            npm run start
                        </code>
                    </p>
                </div>
            </span>
            <Button type="button" className="btn list-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
};

export default InfoPage;