<?php
/**
 * WooCommerce empty cart with the Figma Make empty state.
 *
 * @package AkahMobile
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

// Keep the native notices and extension hooks. The AKAH panel supplies the empty message.
$default_message = has_action( 'woocommerce_cart_is_empty', 'wc_empty_cart_message' );
if ( false !== $default_message ) {
	remove_action( 'woocommerce_cart_is_empty', 'wc_empty_cart_message', $default_message );
}
do_action( 'woocommerce_cart_is_empty' );
if ( false !== $default_message ) {
	add_action( 'woocommerce_cart_is_empty', 'wc_empty_cart_message', $default_message );
}
?>
<div class="wc-empty-cart-message akah-empty-cart flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
	<span class="grid size-14 place-items-center rounded-full bg-blue-100 text-blue-600" aria-hidden="true">
		<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
			<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>
		</svg>
	</span>
	<h2 class="mt-4">Giỏ hàng đang trống</h2>
	<p class="text-sm text-slate-500">Hãy khám phá các sản phẩm công nghệ phù hợp với bạn.</p>
	<a class="button mt-6" href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>">Tiếp tục mua sắm</a>
</div>
