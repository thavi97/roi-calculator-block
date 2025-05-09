<?php

/**
 * Plugin Name: ROI Calculator Block
 * Description: A customizable ROI calculator Gutenberg block.
 * Author: Thavi Tennakoon
 */

function roi_calculator_block_init()
{
	// Register the block
	register_block_type(__DIR__ . '/roi-calculator/build/roi-calculator', [
		'render_callback' => 'roi_calculator_block_render_callback', // Register the callback for frontend rendering
	]);
}
add_action('init', 'roi_calculator_block_init');

/**
 * Callback function for rendering the ROI Calculator Block on the frontend.
 *
 * @param array $attributes Block attributes.
 * @return string Rendered HTML.
 */
function roi_calculator_block_render_callback($attributes)
{
	$input_fields      = $attributes['inputFields'] ?? [];
	$calculated_fields = $attributes['calculatedFields'] ?? [];

	ob_start();
?>
	<div class="roi-calculator" data-calculations='<?= esc_attr(wp_json_encode($calculated_fields)); ?>'>
		<?php foreach ($input_fields as $field) : ?>
			<div class="roi-field">
				<label>
					<?= esc_html($field['label']); ?>
					<input type="<?= esc_attr($field['type'] === 'range' ? 'range' : $field['type']); ?>"
						data-key="<?= esc_attr($field['key']); ?>"
						data-percentage="<?= esc_attr( $field['isPercentage'] ?? 'no' ); ?>"
						min="<?= esc_attr($field['min'] ?? 0); ?>"
						max="<?= esc_attr($field['max'] ?? 100); ?>"
						step="0.01"
						value="<?= esc_attr($field['value'] ?? ($field['type'] === 'range' ? 50 : '')); ?>" />
					<?php if ('range' === $field['type']) : ?>
						<span class="range-value">
							<?= esc_attr($field['value'] ?? 50); ?><?= $field['isPercentage'] === 'yes' ? '%' : ''; ?>
						</span> <?php endif; ?>
				</label>
			</div>
		<?php endforeach; ?>

		<div class="roi-results">
			<?php foreach ($calculated_fields as $field) : ?>
				<p class="roi-result" data-key="<?= esc_attr($field['key']); ?>">
					<?= esc_html($field['label']); ?>: <span>0</span>
				</p>
			<?php endforeach; ?>
		</div>
	</div>
<?php
	return ob_get_clean();
}
