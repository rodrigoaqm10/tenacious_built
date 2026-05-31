import { shopifyFetch } from "./shopify";

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id firstName lastName email }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_LOGIN = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_INFO = `
  query customer($token: String!) {
    customer(customerAccessToken: $token) {
      id
      firstName
      lastName
      email
      orders(first: 10) {
        nodes {
          id
          orderNumber
          name
          totalPrice { amount currencyCode }
          subtotalPrice { amount currencyCode }
          totalShippingPrice { amount currencyCode }
          totalTax { amount currencyCode }
          processedAt
          fulfillmentStatus
          statusUrl
          successfulFulfillments {
            trackingInfo {
              number
              url
            }
          }
          shippingAddress {
            address1
            city
            province
            country
          }
          lineItems(first: 20) {
            nodes {
              title
              quantity
              variant {
                title
                price { amount currencyCode }
                image { url }
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_RECOVER = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors { code field message }
    }
  }
`;

export async function createCustomer({ firstName, lastName, email, password }) {
  const data = await shopifyFetch(CUSTOMER_CREATE, {
    input: { firstName, lastName, email, password },
  });

  if (data.customerCreate.customerUserErrors.length > 0) {
    const error = data.customerCreate.customerUserErrors[0];
    throw new Error(translateError(error));
  }

  return data.customerCreate.customer;
}

export async function loginCustomer({ email, password }) {
  const data = await shopifyFetch(CUSTOMER_LOGIN, {
    input: { email, password },
  });

  if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
    const error = data.customerAccessTokenCreate.customerUserErrors[0];
    throw new Error(translateError(error));
  }

  const token = data.customerAccessTokenCreate.customerAccessToken;
  localStorage.setItem("shopify_customer_token", token.accessToken);
  localStorage.setItem("shopify_customer_expires", token.expiresAt);
  return token;
}

export async function getCustomerInfo() {
  const token = localStorage.getItem("shopify_customer_token");
  if (!token) return null;

  try {
    const data = await shopifyFetch(CUSTOMER_INFO, { token });
    return data.customer;
  } catch (err) {
    const message = (err?.message || "").toUpperCase();
    if (message.includes("UNAUTHORIZED") || message.includes("INVALID") || message.includes("EXPIRED")) {
      logout();
    }
    return null;
  }
}

export async function recoverPassword(email) {
  const data = await shopifyFetch(CUSTOMER_RECOVER, { email });

  if (data.customerRecover.customerUserErrors.length > 0) {
    const error = data.customerRecover.customerUserErrors[0];
    throw new Error(translateError(error));
  }

  return true;
}

export function logout() {
  localStorage.removeItem("shopify_customer_token");
  localStorage.removeItem("shopify_customer_expires");
}

export function isLoggedIn() {
  const token = localStorage.getItem("shopify_customer_token");
  const expires = localStorage.getItem("shopify_customer_expires");
  if (!token || !expires) return false;
  return new Date(expires) > new Date();
}

function translateError(error) {
  const messages = {
    TAKEN: "Este correo ya está registrado.",
    TOO_SHORT: "La contraseña debe tener al menos 5 caracteres.",
    INVALID: "Correo o contraseña incorrectos.",
    BLANK: "Completa todos los campos.",
    UNIDENTIFIED_CUSTOMER: "Correo o contraseña incorrectos.",
  };
  return messages[error.code] || error.message || "Error desconocido.";
}
