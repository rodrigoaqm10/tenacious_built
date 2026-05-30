import { useEffect, useState } from "react";
import { isShopifyConfigured, getProducts } from "./shopify";

export function useShopifyProducts(fallbackProducts) {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFromShopify, setIsFromShopify] = useState(false);

  useEffect(() => {
    if (!isShopifyConfigured) {
      return;
    }

    let cancelled = false;
    setLoading(true);

    getProducts()
      .then((shopifyProducts) => {
        if (!cancelled && shopifyProducts && Array.isArray(shopifyProducts) && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
          setIsFromShopify(true);
        }
      })
      .catch((err) => {
        console.warn("Shopify fetch failed, using fallback products:", err?.message || err);
        if (!cancelled) setError(err?.message || "Error loading products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { products: products || fallbackProducts, loading, error, isFromShopify };
}
