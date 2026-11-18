<?php
/**
 * Storefront shell. WooCommerce renders its own transactional forms and content.
 *
 * @package AkahMobile
 */

defined( 'ABSPATH' ) || exit;
$data = akah_storefront_data();
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'akah-store' ); ?>>
<?php wp_body_open(); ?>
<a class="akah-skip-link" href="#akah-main">Chuyển tới nội dung</a>
<div id="akah-app"></div>
<div id="akah-native-source" hidden>
	<?php if ( in_array( $data['route'], array( 'native', 'login', 'woo-account' ), true ) ) : ?>
		<div id="akah-native-content" class="akah-native <?php echo 'woo-account' === $data['route'] ? 'akah-account-content' : ''; ?>">
			<?php if ( is_404() ) : ?>
				<h1>Không tìm thấy trang</h1>
				<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Về trang chủ</a></p>
			<?php endif; ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php if ( 'native' !== $data['route'] ) : the_content(); continue; endif; ?>
				<article <?php post_class(); ?>>
					<h1><?php if ( is_singular() ) : the_title(); else : ?>
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					<?php endif; ?></h1>
					<?php if ( is_singular() ) { the_content(); } else { the_excerpt(); } ?>
				</article>
			<?php endwhile; ?>
			<?php if ( ! is_singular() ) { the_posts_pagination(); } ?>
		</div>
	<?php elseif ( 'woo-cart' === $data['route'] ) : ?>
		<div id="akah-native-cart" class="akah-native akah-cart">
			<?php
			if ( have_posts() ) {
				the_post();
				the_content();
			}
			?>
		</div>
	<?php elseif ( 'product' === $data['route'] ) : ?>
		<?php the_post(); ?>
		<div id="akah-native-purchase" class="woocommerce"><?php woocommerce_template_single_add_to_cart(); ?></div>
		<?php if ( trim( get_the_content() ) !== '' ) : ?>
			<div id="akah-native-description" class="akah-native akah-description">
				<h2>Thông tin sản phẩm</h2>
				<?php the_content(); ?>
			</div>
		<?php endif; ?>
	<?php elseif ( 'contact' === $data['route'] ) : ?>
		<div id="akah-native-contact" class="akah-native">
			<?php
			$contact_page = get_page_by_path( 'lien-he' );
			if ( $contact_page && 'publish' === $contact_page->post_status && ! post_password_required( $contact_page ) ) {
				echo apply_filters( 'the_content', $contact_page->post_content ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			} else {
				?>
				<p class="mt-4">Liên hệ hotline <a href="tel:19006868">1900 6868</a> để được hỗ trợ.</p>
				<?php
			}
			?>
		</div>
	<?php endif; ?>
	<?php if ( ! in_array( $data['route'], array( 'native', 'login', 'woo-account', 'woo-cart' ), true ) && function_exists( 'wc_output_all_notices' ) ) : ?>
		<div id="akah-native-notices" class="akah-notices"><?php wc_output_all_notices(); ?></div>
	<?php endif; ?>
</div>
<div id="akah-cart-state" hidden><?php echo akah_cart_count_markup(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
<script id="akah-data" type="application/json"><?php echo wp_json_encode( $data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_INVALID_UTF8_SUBSTITUTE ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></script>
<noscript><p>Vui lòng bật JavaScript để sử dụng cửa hàng.</p></noscript>
<?php wp_footer(); ?>
</body>
</html>
