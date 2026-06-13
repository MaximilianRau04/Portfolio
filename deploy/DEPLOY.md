# Deployment-Anleitung — raudev.com (selbst-gehosteter Linux-Server)

Diese Anleitung hostet das Portfolio auf deinem eigenen Linux-Server zuhause:
statisches Frontend (`docs/`) via **nginx**, Kontakt-Backend (`backend/`) als
**Node/systemd-Service**, alles unter `https://raudev.com`.

Befehle mit `sudo` laufen **auf dem Server**. Wo du `<...>` siehst, eigenen Wert einsetzen.

---

## 0. Architektur in einem Satz

```
Internet ──> Router (Port 80/443) ──> Server :nginx
                                          ├── /            -> /var/www/portfolio/docs   (statische Seite)
                                          └── /api/        -> 127.0.0.1:3001            (Node-Backend, Kontaktformular)
```

---

## 1. Netzwerk-Check (zuerst! entscheidet, ob Heimhosting überhaupt geht)

Auf dem **Server** ausführen:

```bash
# Öffentliche IP laut Internet
curl -4 ifconfig.me ; echo

# IP, die der Router selbst hat (im Router-Webinterface unter "WAN"/"Internet")
```

**Vergleiche die beiden IPs:**

- **Gleich** → echte öffentliche IPv4, super, Heimhosting geht. Weiter mit Schritt 2.
- **Unterschiedlich** (Router-WAN ist z.B. `100.64.x.x` / `10.x` / `172.16–31.x`) →
  **CGNAT**. Dein Provider gibt dir keine echte öffentliche IPv4. Dann geht klassisches
  Port-Forwarding **nicht**. Optionen:
  1. Beim Provider eine **echte/öffentliche IPv4** beantragen (oft kostenlos/gegen Gebühr).
  2. Einen **Tunnel** nutzen (Cloudflare Tunnel, Tailscale Funnel) — Server bleibt hinter CGNAT,
     der Tunnel-Anbieter macht die Erreichbarkeit. Sag mir Bescheid, dann gebe ich dir den Cloudflare-Tunnel-Weg.

**Statisch oder dynamisch?** Heim-Anschlüsse haben meist eine **dynamische** IP (ändert sich
ab und zu). Dann brauchst du **DDNS** (Schritt 3b), sonst zeigt deine Domain irgendwann ins Leere.

---

## 2. Router: Ports freigeben (Port-Forwarding)

Im Router-Webinterface (FritzBox: *Internet → Freigaben → Portfreigaben*):

| Extern | Protokoll | Ziel (Server-LAN-IP) | Intern |
|--------|-----------|----------------------|--------|
| 80     | TCP       | z.B. 192.168.x.x     | 80     |
| 443    | TCP       | z.B. 192.168.x.x     | 443    |

> Gib dem Server am besten eine **feste LAN-IP** (DHCP-Reservierung im Router), damit das
> Forwarding nicht ins Leere zeigt, wenn sich die interne IP ändert.

Server-LAN-IP herausfinden: `ip -4 addr show | grep inet`

---

## 3. DNS bei netcup setzen

Im **netcup CCP** (Customer Control Panel, <https://www.customercontrolpanel.de>):
*Produkte → Domains → raudev.com → DNS*. Dort unter „DNS-Records" anlegen/bearbeiten:

| Host (Name) | Typ | Destination (Wert) |
|-------------|-----|--------------------|
| `@`         | A   | `93.238.68.5`      |
| `www`       | A   | `93.238.68.5`      |

> Falls schon Records vorhanden sind (z.B. von einem netcup-Webhosting), die alten
> A-/AAAA-/CNAME-Einträge für `@` und `www` entfernen, damit nichts kollidiert.
> AAAA-Records nur setzen, wenn der Server auch per IPv6 erreichbar ist (sonst weglassen).

Prüfen (Propagierung kann ein paar Minuten dauern):

```bash
dig +short raudev.com
dig +short www.raudev.com
```

### 3b. Dynamische IP → DDNS über die netcup-DNS-API

`93.238.x` ist Telekom-Privatkunde → die IP ist vermutlich **dynamisch**. Damit der A-Record
automatisch aktualisiert wird, nutzen wir die **netcup DNS-API**:

1. Im CCP unter *Stammdaten → API* die **API-Key** und **API-Password** erzeugen.
2. Ein fertiges Update-Skript wie [`nc_ddns`](https://github.com/stecman/netcup-ddns) oder
   [`nc-ddns`](https://github.com/nbsp1221/netcup-ddns) auf dem Server einrichten und per
   `cron`/systemd-Timer alle 5–15 min laufen lassen.

Den genauen DDNS-Setup geben wir nach dem Grund-Deployment durch (Schritt 8b). Erst muss die
Seite überhaupt online sein.

---

## 4. Code auf den Server bringen

Auf dem **Server**:

```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R "$USER":"$USER" /var/www/portfolio

# Variante A: per git (empfohlen, einfache Updates)
git clone https://github.com/MaximilianRau04/Portfolio.git /var/www/portfolio

# Variante B: vom lokalen Rechner hochladen (statt git)
#   (auf deinem LOKALEN Rechner ausführen)
#   rsync -av --exclude backend/.env ./ <user>@<server>:/var/www/portfolio/
```

---

## 5. Pakete installieren (Debian/Ubuntu — bei anderem Distro anpassen)

```bash
sudo apt update
sudo apt install -y nginx

# Node.js LTS (über NodeSource)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # sollte v20+ zeigen

# certbot für SSL
sudo apt install -y certbot python3-certbot-nginx
```

---

## 6. Backend einrichten

```bash
cd /var/www/portfolio/backend
npm install --omit=dev

# .env aus Vorlage erstellen und ausfüllen
cp .env.example .env
nano .env
```

`.env` ausfüllen — Beispiel:

```ini
PORT=3001
ALLOWED_ORIGIN=https://raudev.com

# Gmail-SMTP (Beispiel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=maxi.rau2004@gmail.com
SMTP_PASS=<Gmail App-Passwort, NICHT dein normales Passwort>

RECIPIENT_EMAIL=maxi.rau2004@gmail.com
```

> **Wichtig — Gmail:** Du brauchst ein **App-Passwort** (16 Zeichen), kein normales
> Passwort. Voraussetzung: 2-Faktor-Auth aktiv. Erstellen unter
> <https://myaccount.google.com/apppasswords>. Falls dein Heim-Provider Port 587 nicht
> blockt (587 ist Submission und i.d.R. erlaubt), läuft das. Port 25 ausgehend ist bei
> Heimanschlüssen oft gesperrt — wir nutzen aber 587, also kein Problem.

Backend als Service starten:

```bash
sudo cp /var/www/portfolio/deploy/portfolio-backend.service /etc/systemd/system/
# Verzeichnis muss www-data lesen können:
sudo chown -R www-data:www-data /var/www/portfolio/backend
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-backend
systemctl status portfolio-backend     # sollte "active (running)" sein

# Schnelltest lokal:
curl -s -X POST http://127.0.0.1:3001/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"a@b.de","message":"hi"}'
```

---

## 7. nginx konfigurieren

```bash
sudo cp /var/www/portfolio/deploy/nginx-raudev.conf /etc/nginx/sites-available/raudev.com
sudo ln -s /etc/nginx/sites-available/raudev.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # Default-Seite weg

# nginx muss docs/ lesen können
sudo chown -R www-data:www-data /var/www/portfolio/docs

sudo nginx -t                 # Syntax prüfen
sudo systemctl reload nginx
```

Jetzt sollte `http://raudev.com` (noch ohne https) die Seite zeigen.

---

## 8. SSL / HTTPS (Let's Encrypt)

```bash
sudo certbot --nginx -d raudev.com -d www.raudev.com
```

certbot holt das Zertifikat, baut die 443-Server-Blocks in die nginx-Config ein und richtet
den HTTP→HTTPS-Redirect ein. Auto-Renewal ist per systemd-Timer automatisch aktiv
(`systemctl list-timers | grep certbot`).

> **Firewall:** falls `ufw` aktiv ist: `sudo ufw allow 'Nginx Full'` und `sudo ufw allow OpenSSH`.

---

## 8b. DDNS einrichten (nur bei dynamischer IP)

Erst prüfen, ob die IP überhaupt wechselt: über ein paar Tage hinweg `curl -4 ifconfig.me`
beobachten, oder im Router-WAN nachsehen. Bei Telekom-Privatanschluss meist dynamisch.

Setup mit einem netcup-DDNS-Skript (Beispiel-Ablauf):

```bash
# Voraussetzung: API-Key + API-Password im CCP unter Stammdaten -> API erzeugt
sudo apt install -y git python3 python3-venv   # je nach Skript
git clone https://github.com/stecman/netcup-ddns.git /opt/netcup-ddns
# Konfiguration mit API-Key, API-Password, Customer-Number, Domain raudev.com, Host @ und www
# Danach per systemd-Timer/cron alle 5-15 min ausführen, z.B.:
#   */10 * * * * /opt/netcup-ddns/update.sh >> /var/log/netcup-ddns.log 2>&1
```

Sag mir Bescheid, wenn du hier bist — dann gehen wir die Skript-Config konkret durch.

---

## 9. Endkontrolle

- `https://raudev.com` lädt mit gültigem Zertifikat (Schloss-Symbol).
- `https://raudev.com/legal-notice/legal-notice.html` und `.../privacy-policy/privacy-policy.html` laden.
- Kontaktformular abschicken → Mail kommt an. Bei Fehler: `journalctl -u portfolio-backend -f`.

---

## 10. Updates / Redeploy

```bash
cd /var/www/portfolio
git pull
# Frontend: nichts weiter nötig (statisch). Falls Berechtigungen:
sudo chown -R www-data:www-data /var/www/portfolio/docs

# Backend geändert?
cd backend && npm install --omit=dev
sudo systemctl restart portfolio-backend
```

---

## 11. Troubleshooting

| Symptom | Ursache / Fix |
|---|---|
| Domain nicht erreichbar von außen | DNS noch nicht propagiert (`dig`), Port-Forwarding falsch, oder **CGNAT** (Schritt 1) |
| `502 Bad Gateway` bei `/api/` | Backend läuft nicht → `systemctl status portfolio-backend`, Logs prüfen |
| Kontaktformular: 500-Fehler | SMTP falsch (App-Passwort?), `journalctl -u portfolio-backend -f` |
| Kein Zertifikat | Port 80 muss von außen erreichbar sein, bevor certbot läuft |
| `403 Forbidden` | `www-data` darf `docs/` nicht lesen → `chown`/`chmod` prüfen |
| Seite lädt nur lokal, nicht extern | Router-Forwarding oder Provider blockt Port 80/443 |

---

## 12. Hinweis zu GitHub Pages

Solange GitHub Pages noch aktiv ist, zeigt der alte Link weiter dorthin. Das stört den
eigenen Server nicht. Wenn du willst, kann Pages später deaktiviert werden — die `docs/`-Seite
läuft dann ausschließlich auf raudev.com.
