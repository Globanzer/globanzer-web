# globanzer-web

Sitio público de **GLOBANZER LLC**. Cursor edita estos archivos. **No** es Google Sites.

## Hosting recomendado (gratis)

**Cloudflare Pages** — el nombre que suele olvidarse en los tutoriales “GitHub + Cursor + hosting profesional gratis”. Alternativas: GitHub Pages, Vercel, Netlify.

Dominio **se queda en GoDaddy**. No mover registros **MX** (correo `Contact.us@globanzer.com`).

## Cómo publicar (Nelson, una vez)

1. Crear repo en GitHub (público o privado) y subir esta carpeta.
2. [Cloudflare Pages](https://pages.cloudflare.com/) → Connect Git → este repo. Build: vacío. Output: `/`.
3. Custom domain: `www.globanzer.com`.
4. GoDaddy DNS: CNAME `www` hacia el target que Cloudflare muestre. Apex según su guía.
5. Cuando HTTPS esté verde, el Google Sites deja de ser el destino de `www`.

Vista local: abrir `index.html` en el navegador.
