# Pasos Nelson — sitio en Cloudflare (oficial)

Repo ya publicado. Preview: https://globanzer-web.contact-us-a17.workers.dev

## Quitar Google Sites y apuntar globanzer.com

**No borres MX** (`smtp.google.com`). Ahí vive Contact.us@globanzer.com.

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Add a site** → `globanzer.com` → Free.
2. Mira el listado de DNS **antes** de cambiar nada: tiene que aparecer **MX → smtp.google.com**. Si no está, para y avísale a Cursor.
3. Anota los **2 nameservers** que Cloudflare muestra.
4. Workers & Pages → **globanzer-web** → Settings → Domains → añade `www.globanzer.com` y `globanzer.com`.
5. GoDaddy → globanzer.com → Nameservers → pega esos 2 (salen `domaincontrol.com`).
6. Cuando `https://www.globanzer.com` cargue la web nueva: Google Sites → quitar dominio personalizado.

## Formulario de contacto
Los envíos van a **Contact.us@globanzer.com**. La **primera** vez, Formsubmit manda un correo de activación a ese buzón: hay que abrir el enlace. Si no, el form no entrega. Revisa spam.

Terminal Cursor o PowerShell de esta PC: da igual. Login de GoDaddy/Cloudflare: solo Nelson.
