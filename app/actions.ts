"use server";

import { createCart, addToCart, shopifyFetch } from "@/lib/shopify";

export async function createCheckout(variantId: string) {
  try {
    // Create an empty cart
    const cart = await createCart();
    
    // Add the specific item
    const updatedCart = await addToCart(cart.id, [{ merchandiseId: variantId, quantity: 1 }]);
    
    // Temporary fix: Shopify returns the primary domain (luazwellness.de) for checkout, 
    // but that now points to Netlify. We rewrite it to the myshopify.com domain so checkout works.
    let checkoutUrl = updatedCart.checkoutUrl;
    if (checkoutUrl.includes("luazwellness.de")) {
      const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "b92f81-ad.myshopify.com";
      checkoutUrl = checkoutUrl.replace("luazwellness.de", storeDomain);
    }
    
    return checkoutUrl;
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw new Error("Could not create checkout");
  }
}

export async function getWellnessKitVariant() {
  const query = `
    query getProduct {
      product(handle: "yoga-wellness-kit") {
        id
        title
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await shopifyFetch<any>({ query });
  const product = res.body.data.product;
  
  if (!product) return null;
  
  const variant = product.variants.edges[0]?.node;
  return {
    productId: product.id,
    variantId: variant.id,
    price: variant.price
  };
}
