# Tenacious

Ecommerce responsive para vestuario de gym, construido con React + Vite y preparado para conectarse con Shopify Storefront API.

## Editar contenido

- Marca, textos, categorias, productos y rutas de imagen: `src/data/siteContent.js`
- Colores y estilos visuales: `src/styles.css`
- Credenciales de Shopify: copia `.env.example` como `.env` y reemplaza los valores.

## Comandos

```powershell
npm install
npm run dev
npm run build
```

## Shopify

La integracion esta preparada en `src/lib/shopify.js`. Para conectar productos reales necesitas:

- Dominio de la tienda Shopify.
- Storefront access token.
- Handles o colecciones que quieras mostrar.

Por seguridad, no subas el archivo `.env` al repositorio.
