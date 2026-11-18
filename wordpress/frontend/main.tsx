import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import App from "../../src/App";
import { StorefrontContext, type Storefront } from "../../src/storefront";
import "../../src/index.css";

const root = document.getElementById("akah-app");
const data = document.getElementById("akah-data");
if (root && data?.textContent) {
  const storefront: Storefront = JSON.parse(data.textContent);
  flushSync(() => {
    createRoot(root).render(
      <StorefrontContext.Provider value={storefront}>
        <App />
      </StorefrontContext.Provider>,
    );
  });
}

const variationForm = document.querySelector<HTMLFormElement>(
  "#akah-native-purchase .variations_form",
);
if (variationForm) {
  const buyNow = variationForm.querySelector<HTMLButtonElement>(".akah-buy-now");
  const variationControls = variationForm.querySelector(".woocommerce-variation-add-to-cart");
  const sync = () => {
    if (buyNow) {
      buyNow.disabled = !variationControls?.classList.contains(
        "woocommerce-variation-add-to-cart-enabled",
      );
    }
  };
  if (variationControls && buyNow) {
    new MutationObserver(sync).observe(variationControls, {
      attributes: true,
      attributeFilter: ["class"],
    });
    sync();
  }
}

// WooCommerce Blocks updates its own cart state independently of classic cart fragments.
function connectBlockCartCount() {
  if (!document.querySelector(".wp-block-woocommerce-cart, .wp-block-woocommerce-checkout")) {
    return;
  }
  const data = (
    window as Window & {
      wp?: {
        data?: {
          select: (store: string) => { getCartData?: () => { itemsCount?: number } } | undefined;
          subscribe: (listener: () => void, store: string) => () => void;
        };
      };
    }
  ).wp?.data;
  const cart = data?.select("wc/store/cart");
  if (!data || !cart?.getCartData) return;
  const sync = () => {
    const count = cart.getCartData?.().itemsCount;
    const badge = document.getElementById("akah-cart-count");
    if (badge && typeof count === "number" && badge.dataset.count !== String(count)) {
      badge.dataset.count = String(count);
    }
  };
  data.subscribe(sync, "wc/store/cart");
}
window.addEventListener("load", connectBlockCartCount, { once: true });
