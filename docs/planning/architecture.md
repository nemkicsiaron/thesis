# Arhitektúrája a p2p rendszernek

### 1. Kliensek
- A más tartalmát nem hosztoló, azaz csak böngészői szinten létező felhasználók
- JSON formában, lokálisan és csak lokálisan tárolva, RSA titkosított fájl reprezentálja a profiljukat
- Következőket tudja:
-- Regisztrálni/bejelentkezni
-- Meglévő hírdetést böngészni aggregátoron
-- Új hirdetést létrehozni, azt aláírni
-- Saját privát RSA kulcsot exportálni

### 2. Aggregáló szerverek
- Az aggregáló szerverek nyilvántartják az adattároló szervereket
- A kliensek ezeket érik el először
- Indexerként működnek
- Kérés szerint megkeresi a lehetséges találatokat és visszatéríti a helyes találatot tartalmazó szervert

### 3. Adattároló szerverek
- SQLite adatbázisok
- Kategóriákra bontva ment hírdetéseket
- Felhasználók indíthatnak sajátot
- Prisma segítségével incode lekérdezések
- JSON-ná alakítható hirdetéseket tárol, amelyeket a feladók privát kulccsal aláírtak
- Kategóriák segítségével kikeresi és elérhetővé teszi az aggregátor által beirányított kliens keresett hírdetését