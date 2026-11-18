<?php
/**
 * Signed-in account overview with recent WooCommerce orders.
 *
 * @package AkahMobile
 * @version 4.4.0
 */

defined( 'ABSPATH' ) || exit;

if ( ! is_user_logged_in() ) {
	return;
}

$orders = wc_get_orders( array(
	'customer_id' => get_current_user_id(),
	'type'        => 'shop_order',
	'status'      => array_keys( wc_get_order_statuses() ),
	'limit'       => 3,
	'orderby'     => 'date',
	'order'       => 'DESC',
) );
?>
<section class="akah-order-overview" aria-labelledby="akah-recent-orders">
	<h2 id="akah-recent-orders">Đơn hàng gần đây</h2>
	<?php if ( ! $orders ) : ?>
		<div class="akah-account-empty">
			<p>Bạn chưa có đơn hàng nào.</p>
			<a class="button" href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>">Khám phá sản phẩm</a>
		</div>
	<?php endif; ?>
	<?php foreach ( $orders as $order ) : ?>
		<?php $date = $order->get_date_created(); ?>
		<article class="akah-account-order">
			<div class="akah-order-heading">
				<div>
					<strong>#<?php echo esc_html( $order->get_order_number() ); ?></strong>
					<?php if ( $date ) : ?>
						<time datetime="<?php echo esc_attr( $date->format( DATE_W3C ) ); ?>"><?php echo esc_html( wc_format_datetime( $date, 'd/m/Y' ) ); ?></time>
					<?php endif; ?>
				</div>
				<span class="akah-order-status"><?php echo esc_html( wc_get_order_status_name( $order->get_status() ) ); ?></span>
			</div>
			<?php
			$items = $order->get_items();
			$item  = reset( $items );
			if ( $item ) :
				$product = $item->get_product();
				?>
				<div class="akah-order-item">
					<?php echo $product ? $product->get_image( 'woocommerce_thumbnail', array( 'alt' => '' ) ) : wc_placeholder_img( 'woocommerce_thumbnail', array( 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<div>
						<strong><?php echo esc_html( $item->get_name() ); ?></strong>
						<p>Số lượng: <?php echo esc_html( wc_format_localized_decimal( $item->get_quantity() ) ); ?></p>
						<?php if ( count( $items ) > 1 ) : ?>
							<p>+ <?php echo esc_html( number_format_i18n( count( $items ) - 1 ) ); ?> mặt hàng khác</p>
						<?php endif; ?>
					</div>
				</div>
			<?php endif; ?>
			<div class="akah-order-footer">
				<div>Tổng cộng <strong><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></strong></div>
				<a class="button" href="<?php echo esc_url( $order->get_view_order_url() ); ?>">Xem chi tiết<span class="screen-reader-text"> đơn hàng <?php echo esc_html( $order->get_order_number() ); ?></span></a>
			</div>
		</article>
	<?php endforeach; ?>
	<?php if ( $orders ) : ?>
		<a class="akah-all-orders" href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>">Xem tất cả đơn hàng →</a>
	<?php endif; ?>
</section>
<?php
do_action( 'woocommerce_account_dashboard' );
do_action( 'woocommerce_before_my_account' );
do_action( 'woocommerce_after_my_account' );
