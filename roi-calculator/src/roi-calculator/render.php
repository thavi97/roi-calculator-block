<?php
function roi_calculator_block_render_callback( $attributes ) {
	$input_fields      = $attributes['inputFields'] ?? [];
	$calculated_fields = $attributes['calculatedFields'] ?? [];

	ob_start();
	?>
	<div class="roi-calculator" data-calculations='<?php echo esc_attr( wp_json_encode( $calculated_fields ) ); ?>'>
		<?php foreach ( $input_fields as $field ) : ?>
			<div class="roi-field">
				<label>
					<?php echo esc_html( $field['label'] ); ?>
					<input type="<?php echo esc_attr( $field['type'] ); ?>"
						data-key="<?php echo esc_attr( $field['key'] ); ?>"
						placeholder="<?php echo esc_attr( $field['placeholder'] ); ?>" />
				</label>
			</div>
		<?php endforeach; ?>

		<div class="roi-results">
			<?php foreach ( $calculated_fields as $field ) : ?>
				<p class="roi-result" data-key="<?php echo esc_attr( $field['key'] ); ?>">
					<?php echo esc_html( $field['label'] ); ?>: <span>0</span>
				</p>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
