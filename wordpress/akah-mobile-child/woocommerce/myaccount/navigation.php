<?php
/**
 * WooCommerce account navigation with the Figma Make member panel.
 *
 * @package AkahMobile
 * @version 9.3.0
 */

defined( 'ABSPATH' ) || exit;

$current_user = wp_get_current_user();
do_action( 'woocommerce_before_account_navigation' );
?>
<nav class="woocommerce-MyAccount-navigation" aria-label="Các mục tài khoản">
	<div class="akah-member">
		<span class="akah-member-initial" aria-hidden="true"><?php echo esc_html( wp_html_excerpt( $current_user->display_name, 1, '' ) ); ?></span>
		<div>
			<strong><?php echo esc_html( $current_user->display_name ); ?></strong>
			<span>AKAH Member</span>
		</div>
	</div>
	<ul>
		<?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
			<li class="<?php echo esc_attr( wc_get_account_menu_item_classes( $endpoint ) ); ?>">
				<a href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>" <?php echo wc_is_current_account_menu_item( $endpoint ) ? 'aria-current="page"' : ''; ?>>
					<?php echo esc_html( $label ); ?>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>
<?php do_action( 'woocommerce_after_account_navigation' ); ?>
