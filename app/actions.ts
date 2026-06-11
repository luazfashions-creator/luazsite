"use server";

import { createCart, addToCart, shopifyFetch } from "@/lib/shopify";

export async function createCheckout(variantId: string) {
  try {
    // Create an empty cart
    const cart = await createCart();
    
    // Add the specific item
    const updatedCart = await addToCart(cart.id, [{ merchandiseId: variantId, quantity: 1 }]);
    
    // Return the checkout URL
    return updatedCart.checkoutUrl;
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
