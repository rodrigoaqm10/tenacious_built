import { shopifyFetch } from "./shopify";

const CUSTOMER_CREATE_MARKETING = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;

export async function subscribeNewsletter(email) {
  try {
    const data = await shopifyFetch(CUSTOMER_CREATE_MARKETING, {
      input: {
        email,
        acceptsMarketing: true,
      },
    });

    if (data.customerCreate.customerUserErrors.length > 0) {
      const error = data.customerCreate.customerUserErrors[0];
      if (error.code === "TAKEN") {
        // Already subscribed is fine
        return { success: true, message: "Ya estás suscrito." };
      }
      throw new Error(error.message);
    }

    return { success: true, message: "Suscripción exitosa." };
  } catch (err) {
    throw new Error(err.message || "Error al suscribirse.");
  }
}
