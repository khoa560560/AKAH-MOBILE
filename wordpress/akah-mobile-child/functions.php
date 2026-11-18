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
