const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || "2026-01";

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
    throw new Error(payload.errors?.[0]?.message || "Error consultando Shopify.");
  }

  return payload.data;
}

export const productsQuery = `
  query Products($first: Int = 8) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
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
