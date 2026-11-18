<?php
/**
 * AKAH Mobile child theme setup.
 *
 * @package AkahMobile
 */

defined( 'ABSPATH' ) || exit;

require_once get_stylesheet_directory() . '/inc/storefront.php';

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'woocommerce' );
}, 20 );

add_filter( 'template_include', function ( $template ) {
	if ( ! is_feed() && ! is_embed() && ! is_trackback() ) {
		return get_stylesheet_directory() . '/storefront.php';
	}
	return $template;
}, 99 );

// The React storefront supplies the layout and assets for the public shell.
add_filter( 'astra_enqueue_theme_assets', '__return_false' );

add_action( 'wp_enqueue_scripts', function () {
	$assets = get_stylesheet_directory_uri() . '/assets/';
	$version = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( 'akah-storefront', $assets . 'app/storefront.css', array(), $version );
	wp_enqueue_style( 'akah-woocommerce', $assets . 'woocommerce.css', array( 'akah-storefront' ), $version );
	wp_enqueue_script( 'akah-storefront', $assets . 'app/storefront.js', array(), $version, true );

	if ( class_exists( 'WooCommerce' ) ) {
		wp_enqueue_script( 'wc-cart-fragments' );
	}
}, 100 );

add_action( 'wp_head', function () {
	if ( ! has_site_icon() ) {
		printf( '<link rel="icon" href="%s" type="image/png">' . "\n", esc_url( get_stylesheet_directory_uri() . '/assets/images/favicon.png' ) );
	}
} );

add_filter( 'woocommerce_add_to_cart_fragments', function ( $fragments ) {
	$fragments['#akah-cart-count'] = akah_cart_count_markup();
	return $fragments;
} );

add_action( 'woocommerce_after_add_to_cart_button', function () {
	global $product;
	if ( ! is_product() || ! $product || ! $product->is_type( array( 'simple', 'variable' ) ) ) {
		return;
	}
	if ( $product->is_type( 'simple' ) ) {
		printf( '<input type="hidden" name="add-to-cart" value="%d">', $product->get_id() );
	}
	printf(
		'<button type="submit" class="button akah-buy-now" name="akah_buy_now" value="1"%s>Mua ngay</button>',
		$product->is_type( 'variable' ) ? ' disabled' : ''
	);
} );

add_filter( 'woocommerce_add_to_cart_redirect', function ( $url ) {
	if ( isset( $_POST['akah_buy_now'] ) ) {
		return wc_get_checkout_url();
	}
	if ( isset( $_POST['akah_quick_add'] ) ) {
		return $url ?: wp_validate_redirect( wp_get_referer(), wc_get_cart_url() );
	}
	return $url;
} );

add_filter( 'woocommerce_account_menu_items', function ( $items ) {
	$labels = array(
		'dashboard'       => 'Tổng quan',
		'orders'          => 'Đơn hàng của tôi',
		'downloads'       => 'Tệp tải xuống',
		'edit-address'    => 'Sổ địa chỉ',
		'edit-account'    => 'Thông tin cá nhân',
		'payment-methods' => 'Phương thức thanh toán',
		'customer-logout' => 'Đăng xuất',
	);
	return array_replace( $items, array_intersect_key( $labels, $items ) );
} );

add_filter( 'gettext_woocommerce', function ( $translated, $source ) {
	if ( ! did_action( 'wp' ) || ! function_exists( 'is_account_page' ) || ! is_account_page() ) {
		return $translated;
	}
	$labels = array(
		'Username or email address' => 'Tên đăng nhập hoặc email',
		'Username'                  => 'Tên đăng nhập',
		'Email address'             => 'Địa chỉ email',
		'Password'                  => 'Mật khẩu',
		'Log in'                    => 'Đăng nhập',
		'Register'                  => 'Tạo tài khoản',
		'Remember me'               => 'Ghi nhớ đăng nhập',
		'Lost your password?'       => 'Quên mật khẩu?',
		'A link to set a new password will be sent to your email address.' => 'WooCommerce sẽ gửi liên kết đặt mật khẩu tới email của bạn.',
		'Order'                              => 'Đơn hàng',
		'Date'                               => 'Ngày đặt',
		'Status'                             => 'Trạng thái',
		'Total'                              => 'Tổng cộng',
		'Actions'                            => 'Thao tác',
		'View'                               => 'Xem chi tiết',
		'No order has been made yet.'         => 'Bạn chưa có đơn hàng nào.',
		'Browse products'                    => 'Khám phá sản phẩm',
		'First name'                         => 'Tên',
		'Last name'                          => 'Họ',
		'Display name'                       => 'Tên hiển thị',
		'This will be how your name will be displayed in the account section and in reviews' => 'Tên này hiển thị trong tài khoản và đánh giá của bạn.',
		'Password change'                    => 'Đổi mật khẩu',
		'Current password (leave blank to leave unchanged)' => 'Mật khẩu hiện tại (để trống nếu giữ nguyên)',
		'New password (leave blank to leave unchanged)' => 'Mật khẩu mới (để trống nếu giữ nguyên)',
		'Confirm new password'               => 'Xác nhận mật khẩu mới',
		'Save changes'                       => 'Lưu thay đổi',
		'Billing address'                    => 'Địa chỉ thanh toán',
		'Shipping address'                   => 'Địa chỉ giao hàng',
		'Save address'                       => 'Lưu địa chỉ',
		'The following addresses will be used on the checkout page by default.' => 'Các địa chỉ dưới đây sẽ được dùng mặc định khi thanh toán.',
		'You have not set up this type of address yet.' => 'Bạn chưa thiết lập địa chỉ này.',
	);
	return $labels[ $source ] ?? $translated;
}, 10, 2 );

// Render the same WooCommerce cart form for block and shortcode pages while preserving nearby content.
add_filter( 'render_block_woocommerce/cart', function ( $content ) {
	return is_cart() ? do_shortcode( '[woocommerce_cart]' ) : $content;
} );

/** Add controls only to quantities rendered by the cart form. */
add_action( 'woocommerce_before_quantity_input_field', function () {
	if ( is_cart() ) {
		echo '<button type="button" class="akah-quantity-step" data-step="-1" aria-label="Giảm số lượng">−</button>';
	}
} );

add_action( 'woocommerce_after_quantity_input_field', function () {
	if ( is_cart() ) {
		echo '<button type="button" class="akah-quantity-step" data-step="1" aria-label="Tăng số lượng">+</button>';
	}
} );

add_action( 'woocommerce_after_cart_totals', function () {
	printf(
		'<a class="akah-continue-shopping" href="%s"><span aria-hidden="true">←</span> Tiếp tục mua sắm</a>',
		esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) )
	);
} );

add_filter( 'gettext_woocommerce', function ( $translated, $source ) {
	if ( ! ( did_action( 'wp' ) && function_exists( 'is_cart' ) && is_cart() ) && 'get_cart_totals' !== akah_parameter( 'wc-ajax' ) ) {
		return $translated;
	}
	$labels = array(
		'Cart totals'              => 'Tóm tắt đơn hàng',
		'Cart updated.'            => 'Đã cập nhật giỏ hàng.',
		'View cart'                => 'Xem giỏ hàng',
		'Subtotal'                 => 'Tạm tính',
		'Shipping'                 => 'Phí vận chuyển',
		'Total'                    => 'Tổng cộng',
		'Proceed to checkout'      => 'Tiến hành thanh toán',
		'Update cart'              => 'Cập nhật giỏ hàng',
		'Apply coupon'             => 'Áp dụng',
		'Coupon code'              => 'Mã giảm giá',
		'Coupon:'                  => 'Mã giảm giá:',
		'Remove %s from cart'      => 'Xóa %s khỏi giỏ hàng',
		'Available on backorder'   => 'Có thể đặt trước',
	);
	return $labels[ $source ] ?? $translated;
}, 10, 2 );

add_filter( 'document_title_parts', function ( $parts ) {
	if ( function_exists( 'is_account_page' ) && is_account_page() ) {
		$parts['title'] = 'Tài khoản';
	}
	return $parts;
} );

add_filter( 'gettext_with_context_woocommerce', function ( $translated, $source, $context ) {
	if ( 'Order status' !== $context || ! did_action( 'wp' ) || ! function_exists( 'is_account_page' ) || ! is_account_page() ) {
		return $translated;
	}
	$labels = array(
		'Pending payment' => 'Chờ thanh toán',
		'Processing'      => 'Đang xử lý',
		'On hold'         => 'Đang chờ',
		'Completed'       => 'Đã hoàn tất',
		'Cancelled'       => 'Đã hủy',
		'Refunded'        => 'Đã hoàn tiền',
		'Failed'          => 'Thất bại',
	);
	return $labels[ $source ] ?? $translated;
}, 10, 3 );
