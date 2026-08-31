# Pasos Nelson — opción A (Cloudflare Pages)

El código ya está en `C:\Users\nelso\globanzer-web` (Git instalado, primer commit local). **Tú** creas las cuentas; yo no tengo tu login.

## 1. GitHub (nube del código)

1. Entra a [github.com](https://github.com) (crea cuenta si no hay, con Contact.us@globanzer.com).
2. **New repository** → nombre `globanzer-web` → **no** marques README (el repo local ya tiene archivos).
3. En esa página GitHub muestra comandos. En PowerShell:

```powershell
cd C:\Users\nelso\globanzer-web
& "C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/TU_USUARIO/globanzer-web.git
& "C:\Program Files\Git\cmd\git.exe" push -u origin main
```

Sustituye `TU_USUARIO`. Te pedirá login de GitHub (navegador o token).

## 2. Cloudflare Pages (hosting)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → sign up (gratis).
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → autoriza GitHub → elige `globanzer-web`.
3. Framework: **None**. Build command: vacío. Output directory: `/` (o déjalo vacío si el sitio está en la raíz).
4. **Save and Deploy**. Te da una URL `*.pages.dev` para ver el sitio **antes** de tocar GoDaddy.

## 3. Dominio (cuando `*.pages.dev` se vea bien)

Custom domain `www.globanzer.com` en el proyecto Pages. GoDaddy DNS: CNAME `www` como Cloudflare indique. **No borres MX.**

Cuando el HTTPS de `www` esté verde, Google Sites deja de ser la web pública.
