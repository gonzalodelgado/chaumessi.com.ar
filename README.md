# Gracias, Leo

Sitio estático de homenaje a Lionel Messi, preparado para publicarse en GitHub Pages.

## Publicación

El workflow de [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publica automáticamente el contenido cuando hay un push a `master` o `main`.

En GitHub, abrir **Settings → Pages** y seleccionar **GitHub Actions** como fuente de publicación. Después de ejecutar el workflow, el sitio estará disponible en la URL de Pages del repositorio.

## Dominio personalizado

El archivo [`CNAME`](CNAME) configura `chaumessi.com.ar`. En el proveedor DNS del dominio hay que crear:

- `A` para `@` apuntando a `185.199.108.153`
- `A` para `@` apuntando a `185.199.109.153`
- `A` para `@` apuntando a `185.199.110.153`
- `A` para `@` apuntando a `185.199.111.153`
- `CNAME` para `www` apuntando a `<usuario>.github.io`

GitHub puede tardar en emitir el certificado HTTPS después de verificar el dominio.

## AdSense

Antes de añadir anuncios hay que obtener la aprobación de Google y reemplazar la configuración de ejemplo por el ID real de editor (`ca-pub-...`). Mantener visibles las páginas de privacidad y términos y no solicitar clics en anuncios.
