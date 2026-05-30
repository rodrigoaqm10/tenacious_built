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

// Crear checkout
export const CREATE_CHECKOUT_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

// Transformar producto de Shopify al formato que usa nuestra web
export function transformShopifyProduct(product) {
  const price = product.priceRange.minVariantPrice.amount;
  const formattedPrice = `$${Math.round(Number(price)).toLocaleString("es-CL")}`;
  
  const colorOption = product.options.find(
    (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour"
  );
  const sizeOption = product.options.find(
    (opt) => opt.name.toLowerCase() === "talla" || opt.name.toLowerCase() === "size" || opt.name.toLowerCase() === "tamaño"
  );

  return {
    id: product.id,
    name: product.title,
    handle: product.handle,
    type: product.productType || "",
    description: product.description,
    price: formattedPrice,
    numericPrice: Math.round(Number(price)),
    badge: product.tags?.[0] || "Nuevo",
    color: colorOption?.values?.[0] || "",
    category: product.productType || "General",
    sizes: sizeOption?.values || [],
    colors: colorOption?.values || [],
    image: product.featuredImage?.url || "",
    images: product.images.nodes.map((img) => img.url),
    variants: product.variants.nodes,
  };
}

// Obtener productos transformados
export async function getProducts() {
  const data = await shopifyFetch(PRODUCTS_QUERY);
  return data.products.nodes.map(transformShopifyProduct);
}

// Crear checkout y obtener URL de pago
export async function createCheckout(cartItems) {
  const lineItems = cartItems.map((item) => {
    // Buscar la variante que coincida con talla y color seleccionados
    const variant = item.variants?.find((v) => {
      const options = v.selectedOptions.reduce((acc, opt) => {
        acc[opt.name.toLowerCase()] = opt.value;
        return acc;
      }, {});
      const colorMatch = options.color === item.color || options.colour === item.color;
      const sizeMatch = options.talla === item.size || options.size === item.size || options["tamaño"] === item.size;
      return colorMatch && sizeMatch;
    });

    return {
      variantId: variant?.id || item.variants?.[0]?.id,
      quantity: item.quantity,
    };
  }).filter((item) => item.variantId);

  if (lineItems.length === 0) {
    throw new Error("No se encontraron variantes válidas para el checkout.");
  }

  const data = await shopifyFetch(CREATE_CHECKOUT_MUTATION, {
    input: { lineItems },
  });

  if (data.checkoutCreate.checkoutUserErrors.length > 0) {
    throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
  }

  return data.checkoutCreate.checkout;
}
