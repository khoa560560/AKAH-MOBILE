<?php
/**
 * Adapt WordPress and WooCommerce data to the shared Figma Make storefront.
 *
 * @package AkahMobile
 */

defined( 'ABSPATH' ) || exit;

/** Read a single public URL parameter. */
function akah_parameter( $key ) {
	return isset( $_GET[ $key ] ) && is_string( $_GET[ $key ] )
		? sanitize_text_field( wp_unslash( $_GET[ $key ] ) )
		: '';
}

function akah_brands() {
	return array( 'Apple', 'Samsung', 'Xiaomi', 'OPPO', 'realme', 'vivo' );
}

function akah_accessories() {
	return array(
		'Tai nghe'             => 'tai-nghe',
		'Sạc dự phòng'         => 'sac-du-phong',
		'Cáp sạc'              => 'cap-sac',
		'Ốp lưng'              => 'op-lung',
		'Loa bluetooth'        => 'loa-bluetooth',
		'Đồng hồ thông minh'   => 'dong-ho-thong-minh',
	);
}

/** Resolve both translated slugs and translated names entered in the WooCommerce admin. */
function akah_category( $slug, $name ) {
	if ( ! taxonomy_exists( 'product_cat' ) ) {
		return null;
	}
	return get_term_by( 'slug', $slug, 'product_cat' ) ?: get_term_by( 'name', $name, 'product_cat' );
}

function akah_term_url( $term, $fallback ) {
	$url = $term ? get_term_link( $term ) : $fallback;
	return is_wp_error( $url ) ? $fallback : $url;
}

function akah_store_view() {
	$view = akah_parameter( 'akah_view' );
	$views = array( 'about', 'contact', 'policy-bao-hanh', 'policy-doi-tra', 'policy-giao-hang', 'policy-bao-mat', 'policy-thanh-toan', 'policy-kiem-hang' );
	return is_front_page() && in_array( $view, $views, true ) ? $view : '';
}

function akah_store_urls() {
	$home = home_url( '/' );
	$search = add_query_arg( 'post_type', 'product', $home );
	$urls = array(
		'home'   => $home,
		'search' => $search,
	);
	foreach ( array( 'about', 'contact', 'policy-bao-hanh', 'policy-doi-tra', 'policy-giao-hang', 'policy-bao-mat', 'policy-thanh-toan', 'policy-kiem-hang' ) as $view ) {
		$urls[ $view ] = add_query_arg( 'akah_view', $view, $home );
	}
	if ( ! class_exists( 'WooCommerce' ) ) {
		return $urls;
	}

	$shop = wc_get_page_permalink( 'shop' );
	$phones = akah_category( 'dien-thoai', 'Điện thoại' );
	$accessories = akah_category( 'phu-kien', 'Phụ kiện' );
	$urls['phones'] = akah_term_url( $phones, $shop );
	$urls['accessories'] = akah_term_url( $accessories, $shop );
	$urls['cart'] = wc_get_cart_url();
	$urls['login'] = wc_get_page_permalink( 'myaccount' );
	$urls['account'] = wc_get_account_endpoint_url( 'orders' );
	foreach ( akah_brands() as $brand ) {
		$urls[ 'phones:' . $brand ] = add_query_arg( 'akah_brand', $brand, $urls['phones'] );
	}
	foreach ( akah_accessories() as $name => $slug ) {
		$urls[ 'accessories:' . $name ] = akah_term_url( akah_category( $slug, $name ), $urls['accessories'] );
	}
	return $urls;
}

add_action( 'woocommerce_product_query', function ( $query ) {
	$brand = akah_parameter( 'akah_brand' );
	if ( taxonomy_exists( 'product_brand' ) && in_array( $brand, akah_brands(), true ) ) {
		$tax_query = (array) $query->get( 'tax_query' );
		$tax_query[] = array(
			'taxonomy' => 'product_brand',
			'field'    => 'slug',
			'terms'    => sanitize_title( $brand ),
		);
		$query->set( 'tax_query', $tax_query );
	}
} );

function akah_cart_count() {
	return function_exists( 'WC' ) && WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
}

function akah_cart_count_markup() {
	return sprintf( '<span id="akah-cart-count" data-count="%d"></span>', akah_cart_count() );
}

function akah_product_category( $term_ids ) {
	$accessories = akah_category( 'phu-kien', 'Phụ kiện' );
	foreach ( $term_ids as $id ) {
		if ( $accessories && ( (int) $id === (int) $accessories->term_id || term_is_ancestor_of( $accessories->term_id, $id, 'product_cat' ) ) ) {
			return 'Phụ kiện';
		}
	}
	return 'Điện thoại';
}

/** Serialize public fields only. The native WooCommerce form validates and prices purchases. */
function akah_product_data( $product, $detail = false ) {
	$id = $product->get_id();
	$image = wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_single' ) ?: wc_placeholder_img_src();
	$attributes = array();
	foreach ( $product->get_attributes() as $attribute ) {
		if ( ! $attribute->get_visible() ) {
			continue;
		}
		$name = $attribute->get_name();
		$options = $attribute->is_taxonomy() ? wc_get_product_terms( $id, $name, array( 'fields' => 'names' ) ) : $attribute->get_options();
		if ( ! empty( $options ) && ! is_wp_error( $options ) ) {
			$attributes[] = array( wc_attribute_label( $name, $product ), implode( ', ', $options ) );
		}
	}
	$badge = $product->is_on_sale() ? 'Giảm giá' : ( $product->is_featured() ? 'Nổi bật' : '' );
	$data = array(
		'id'          => $id,
		'name'        => $product->get_name(),
		'brand'       => '',
		'category'    => akah_product_category( $product->get_category_ids() ),
		'price'       => (float) $product->get_price(),
		'oldPrice'    => (float) $product->get_regular_price(),
		'priceHtml'   => wp_kses_post( $product->get_price_html() ),
		'image'       => $image,
		'badge'       => $badge,
		'rating'      => (float) $product->get_average_rating(),
		'reviewCount' => $product->get_review_count(),
		'specs'       => array_column( $attributes, 1 ),
		'url'         => $product->get_permalink(),
		'quickAdd'    => $product->is_type( 'simple' ) && $product->is_purchasable() && $product->is_in_stock(),
	);
	if ( $detail ) {
		$gallery = array( $image );
		foreach ( $product->get_gallery_image_ids() as $attachment_id ) {
			$gallery[] = wp_get_attachment_image_url( $attachment_id, 'woocommerce_single' );
		}
		$data['gallery'] = array_values( array_unique( array_filter( $gallery ) ) );
		$data['attributes'] = $attributes;
	}
	return $data;
}

/** Use WordPress' main query so WooCommerce visibility, filters, sort and pagination stay in sync. */
function akah_query_products() {
	global $wp_query;
	$products = array();
	foreach ( $wp_query->posts as $post ) {
		$product = wc_get_product( $post instanceof WP_Post ? $post->ID : $post );
		if ( $product && ! post_password_required( $product->get_id() ) && $product->is_visible() ) {
			$products[] = akah_product_data( $product );
		}
	}
	return $products;
}

function akah_home_products() {
	$hidden = wc_get_product_visibility_term_ids();
	$args = array(
		'post_type'           => 'product',
		'post_status'         => 'publish',
		'has_password'        => false,
		'posts_per_page'      => 6,
		'no_found_rows'       => true,
		'ignore_sticky_posts' => true,
		'tax_query'           => array(
			array(
				'taxonomy' => 'product_visibility',
				'field'    => 'term_taxonomy_id',
				'terms'    => array_filter( array( $hidden['exclude-from-catalog'], 'yes' === get_option( 'woocommerce_hide_out_of_stock_items' ) ? $hidden['outofstock'] : 0 ) ),
				'operator' => 'NOT IN',
			),
		),
	);
	$featured = wc_get_featured_product_ids();
	$ids = array();
	if ( $featured ) {
		$query = new WP_Query( array_merge( $args, array( 'post__in' => $featured, 'fields' => 'ids' ) ) );
		$ids = $query->posts;
	}
	if ( count( $ids ) < 6 ) {
		$query = new WP_Query( array_merge( $args, array(
			'post__not_in'   => $ids,
			'posts_per_page' => 6 - count( $ids ),
			'fields'         => 'ids',
		) ) );
		$ids = array_merge( $ids, $query->posts );
	}
	$products = array_filter( array_map( 'wc_get_product', $ids ) );
	return array_values( array_map( 'akah_product_data', $products ) );
}

function akah_pagination() {
	global $wp_query;
	$current = max( 1, (int) get_query_var( 'paged' ) );
	$pages = array();
	if ( $wp_query->max_num_pages < 2 ) {
		return $pages;
	}
	$nearby = range( max( 1, $current - 2 ), min( $wp_query->max_num_pages, $current + 2 ) );
	foreach ( array_unique( array_merge( array( 1 ), $nearby, array( $wp_query->max_num_pages ) ) ) as $page ) {
		$pages[] = array( 'label' => $page, 'url' => get_pagenum_link( $page, false ), 'current' => $page === $current );
	}
	return $pages;
}

function akah_archive_data() {
	$term = get_queried_object();
	$category = is_product_category() ? akah_product_category( array( $term->term_id ) ) : 'Sản phẩm';
	$brand = akah_parameter( 'akah_brand' );
	$min = akah_parameter( 'min_price' );
	$max = akah_parameter( 'max_price' );
	$price = 'Tất cả';
	if ( '9999999' === $max ) {
		$price = 'Dưới 10 triệu';
	} elseif ( '10000000' === $min && '20000000' === $max ) {
		$price = '10 - 20 triệu';
	} elseif ( '20000001' === $min ) {
		$price = 'Trên 20 triệu';
	}
	return array(
		'category' => $category,
		'title'    => $term instanceof WP_Term ? $term->name : 'Sản phẩm',
		'brand'    => in_array( $brand, akah_brands(), true ) ? $brand : 'Tất cả',
		'price'    => $price,
		'sort'     => akah_parameter( 'orderby' ),
		'usesVnd'  => 'VND' === get_woocommerce_currency(),
	);
}

function akah_storefront_data() {
	global $wp_query;
	$data = array(
		'route'      => 'native',
		'query'      => '',
		'urls'       => akah_store_urls(),
		'products'   => array(),
		'cartCount'  => akah_cart_count(),
		'heroImage'  => get_stylesheet_directory_uri() . '/assets/images/akah-hero.jpg',
		'total'      => 0,
		'pagination' => array(),
	);
	$view = akah_store_view();
	$woo = class_exists( 'WooCommerce' );

	if ( $view ) {
		$data['route'] = $view;
	} elseif ( $woo && is_cart() && ! post_password_required() ) {
		$data['route'] = 'woo-cart';
	} elseif ( $woo && is_account_page() && ! post_password_required() ) {
		if ( is_user_logged_in() ) {
			$data['route'] = 'woo-account';
		} elseif ( ! is_wc_endpoint_url() ) {
			$registration = 'yes' === get_option( 'woocommerce_enable_myaccount_registration' );
			$data['route'] = 'login';
			$data['auth'] = array(
				'canRegister' => $registration,
				'register'    => $registration && isset( $_POST['register'] ),
			);
		}
	} elseif ( $woo && is_product() && ! post_password_required() ) {
		$product = wc_get_product( get_queried_object_id() );
		if ( $product ) {
			$data['route'] = 'product';
			$data['selected'] = akah_product_data( $product, true );
			foreach ( wc_get_related_products( $product->get_id(), 5 ) as $id ) {
				$related = wc_get_product( $id );
				if ( $related && ! post_password_required( $id ) && $related->is_visible() ) {
					$data['products'][] = akah_product_data( $related );
				}
			}
		}
	} elseif ( $woo && is_search() && 'product' === get_query_var( 'post_type' ) ) {
		$data['route'] = 'search';
		$data['query'] = get_search_query( false );
		$data['products'] = akah_query_products();
		$data['total'] = (int) $wp_query->found_posts;
		$data['pagination'] = akah_pagination();
	} elseif ( is_front_page() && ( ! $woo || ! ( is_cart() || is_checkout() || is_account_page() ) ) ) {
		$data['route'] = 'home';
		$data['products'] = $woo ? akah_home_products() : array();
	} elseif ( $woo && ( is_shop() || is_product_taxonomy() || is_post_type_archive( 'product' ) ) ) {
		$data['route'] = is_product_category() && 'Phụ kiện' === akah_product_category( array( get_queried_object_id() ) ) ? 'accessories' : 'phones';
		$data['archive'] = akah_archive_data();
		$data['products'] = akah_query_products();
		$data['total'] = (int) $wp_query->found_posts;
		$data['pagination'] = akah_pagination();
	}
	return $data;
}
