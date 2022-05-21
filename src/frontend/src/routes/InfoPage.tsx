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
                        A még nem regisztrált felhasználók nem tudnak hirdetéseket létrehozni, de a regisztráció bárkinek elérhető a Profil menüben a <a href="/register">Regisztráció</a> gombra kattintva.
                        A regisztrációhoz kell egy felhasználónév és egy tűrhetően biztonságos (legalább 6 karakter hosszú) jelszó, mely a feldolgozást biztosítja.
                        A sikeres regisztráció eredménye egy <i>.ppem</i> kiterjesztésű fájl, melyben az RSA kulcs adatai tárolódnak.</p>
                    <h3>Bejelentkezés</h3>
                    <p> Természetesen a <a href="/login">Bejelentkezés</a> is a Profil menüben elérhető. A bejelentkezéshez a <i>.ppem</i> kiterjesztésű fájl és a jelszó megadása szükséges.
                    Onnantól a használat idejet alatt a weboldal bejelentkezve tartja a felhasználót. </p>
                    <h3>Kijelentkezés</h3>
                    <p> A kijelentkezéshez elég megnyomni a respektív feliratú gombot a <a href="/profile">Profil kezelése</a> menüben. </p>
                </div>
                <h2>Hirdetések kezelése</h2>
                <div className="info-tab">
                    <h3>Hirdetések megtekintése</h3>
                    <p> A hirdetések megtekintéséhez nem szükséges bejelentkezve lenni.
                        A nyilvános hirdetéseket a <a href="/posts">Hirdetések böngészése</a> vagy a <a href="/servers">Szerverek böngészése</a> felületeken keresztül lehet elérni.</p>
                    <h3>Hirdetés létrehozása</h3>
                    <p> A hirdetés létrehozásához a felhasználók bejelentkezve kell legyenek. Onnantól a <a href="/manage">Hirdetések kezelése</a> menüpontban található a létrehozás gomb.</p>
                    <h3>Hirdetés módosítása és törlése</h3>
                    <p> A bejelentkezett felhasználók a <a href="/own">Saját hirdetéseiket</a> egy helyen tudják megtekinteni ahol kezelhetik is azokat.</p>
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
                    <p> Egyszerű! Letöltöd az adattároló szerver fájljait, majd a szervert folderében futtatod a következő parancsokat parancssorból:
                        <br/>
                        <code>
                            npm install
                            <br/>
                            set PORT="6969" <strong> (tetszőleges port szám) </strong>
                            <br/>
                            set OWN_URI="sajatszerverem.com" <strong> (tetszőleges URL amire kihelyezed a szervert) </strong>
                            <br/>
                            set AGGREGATOR_URI="aggregator.com" <strong> (az aggregátor címe, amiről most is olvasol, és amire a szerver csatlakozhat) </strong>
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