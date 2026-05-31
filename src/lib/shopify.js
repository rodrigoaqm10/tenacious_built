const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || "2024-10";

export const isShopifyConfigured = Boolean(domain && token);

export async function shopifyFetch(query, variables = {}) {
  if (!isShopifyConfigured) {
    throw new Error("Shopify no esta configurado. Revisa el archivo .env.");
  }

  const response = await fetch(
    `https://${domain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  const payload = await response.json();

  if (!response.ok || payload.errors) {
    console.error("Shopify API error:", payload.errors);
    throw new Error(payload.errors?.[0]?.message || "Error consultando Shopify.");
  }

  return payload.data;
}

// Obtener todos los productos con variantes e imágenes
export const PRODUCTS_QUERY = `
  query Products($first: Int = 20) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        productType
        tags
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          nodes {
            url
            altText
          }
        }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            image {
              url
            }
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// Crear carrito y obtener URL de checkout
export const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        attributes {
          key
          value
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

// Crear checkout y obtener URL de pago
export async function createCheckout(cartItems) {
  const lines = cartItems.map((item) => {
    // Buscar la variante que coincida con talla y color seleccionados
    const variant = item.variants?.find((v) => {
      const options = v.selectedOptions.reduce((acc, opt) => {
        acc[opt.name.toLowerCase()] = opt.value;
        return acc;
      }, {});
      const colorMatch = !item.color || options.color === item.color || options.colour === item.color;
      const sizeMatch = !item.size || options.talla === item.size || options.size === item.size || options["tamaño"] === item.size;
      return colorMatch && sizeMatch;
    });

    return {
      merchandiseId: variant?.id || item.variants?.[0]?.id,
      quantity: item.quantity,
    };
  }).filter((item) => item.merchandiseId);

  if (lines.length === 0) {
    throw new Error("No se encontraron variantes válidas para el checkout.");
  }

  // Get the current site URL for return redirect
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  const data = await shopifyFetch(CREATE_CART_MUTATION, {
    input: {
      lines,
      attributes: [
        { key: "return_to", value: siteUrl },
      ],
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return { webUrl: data.cartCreate.cart.checkoutUrl };
}
// Inferir categoría del nombre del producto cuando productType está vacío
function inferCategory(product) {
  // Si tiene productType definido y no es genérico, usarlo
  if (product.productType && product.productType.toLowerCase() !== "general") {
    return product.productType;
  }

  // Inferir del título del producto
  const title = (product.title || "").toLowerCase();
  const handle = (product.handle || "").toLowerCase();
  const combined = `${title} ${handle}`;

  // Mapeo de palabras clave a categorías
  const categoryMap = [
    { keywords: ["short", "shorts", "calza", "legging", "pantalon", "pantalón", "pantalones cortos"], category: "Shorts" },
    { keywords: ["t-shirt", "tshirt", "camiseta", "polera", "remera", "tee", "manga corta"], category: "T-Shirts" },
    { keywords: ["top", "crop"], category: "Tops" },
    { keywords: ["breastplate", "sosten", "sostén", "bra", "sports bra", "sujetador", "bralette", "sujetadores"], category: "Breastplates" },
    { keywords: ["set", "conjunto", "combo", "pack"], category: "Sets" },
    { keywords: ["hoodie", "buzo", "chaqueta", "jacket", "sweater"], category: "Buzos" },
    { keywords: ["accesorio", "bolso", "gorra", "banda", "muñequera"], category: "Accesorios" },
  ];

  for (const { keywords, category } of categoryMap) {
    if (keywords.some((kw) => combined.includes(kw))) {
      return category;
    }
  }

  // Si no se puede inferir, usar productType o el tipo genérico
  return product.productType || "Otros";
}

export function transformShopifyProduct(product) {
  try {
    const price = product?.priceRange?.minVariantPrice?.amount || "0";
    const formattedPrice = `$${Math.round(Number(price)).toLocaleString("es-CL")}`;
    
    const colorOption = product.options?.find(
      (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour"
    );
    const sizeOption = product.options?.find(
      (opt) => opt.name.toLowerCase() === "talla" || opt.name.toLowerCase() === "size" || opt.name.toLowerCase() === "tamaño"
    );

    return {
      id: product.id,
      name: product.title || "Producto",
      handle: product.handle || "",
      type: product.productType || "",
      description: product.description || "",
      price: formattedPrice,
      numericPrice: Math.round(Number(price)),
      badge: product.tags?.[0] || "Nuevo",
      color: colorOption?.values?.[0] || "",
      category: inferCategory(product),
      sizes: sizeOption?.values || [],
      colors: colorOption?.values || [],
      image: product.featuredImage?.url || "",
      images: product.images?.nodes?.map((img) => img.url) || [],
      imagesData: product.images?.nodes || [],
      variants: product.variants?.nodes || [],
    };
  } catch (err) {
    console.warn("Error transforming product:", err);
    return null;
  }
}

// Obtener productos transformados
export async function getProducts() {
  const data = await shopifyFetch(PRODUCTS_QUERY);
  return data.products.nodes.map(transformShopifyProduct).filter(Boolean);
}
