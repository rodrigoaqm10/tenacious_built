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
        if (!cancelled && shopifyProducts && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
          setIsFromShopify(true);
        }
      })
      .catch((err) => {
        console.warn("Shopify fetch failed, using fallback products:", err.message);
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { products, loading, error, isFromShopify };
}
