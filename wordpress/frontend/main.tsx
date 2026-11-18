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

// Use WooCommerce's cart submit button so stock validation and totals stay native.
document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const control = event.target.closest<HTMLButtonElement>(".akah-cart .akah-quantity-step");
  const quantity = control?.closest(".quantity")?.querySelector<HTMLInputElement>("input.qty");
  const form = control?.closest<HTMLFormElement>(".woocommerce-cart-form");
  const submit = form?.querySelector<HTMLButtonElement>('button[name="update_cart"]');
  if (
    !control ||
    !quantity ||
    quantity.step === "any" ||
    !submit ||
    form?.classList.contains("processing")
  )
    return;

  const previous = quantity.value;
  if (control.dataset.step === "-1") {
    if (quantity.valueAsNumber <= Math.max(1, Number(quantity.min))) return;
    quantity.stepDown();
  } else {
    quantity.stepUp();
  }
  if (previous === quantity.value) return;
  quantity.dispatchEvent(new Event("change", { bubbles: true }));
  submit.click();
});
