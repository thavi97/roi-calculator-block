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

function my_roi_calculator_enqueue_bootstrap()
{
	// Bootstrap CSS
	wp_enqueue_style(
		'bootstrap-css',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
	);

	// Bootstrap JS (includes Popper)
	wp_enqueue_script(
		'bootstrap-js',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
		[],
		null,
		true
	);
}
add_action('wp_enqueue_scripts', 'my_roi_calculator_enqueue_bootstrap');


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
    $backgroundColor   = $attributes['backgroundColor'] ?? '#286cfc';
    $textColor         = $attributes['textColor'] ?? '#ffffff';
    $sliderColor       = $attributes['sliderColor'] ?? '#00cc66';

    // Add custom styles for this specific block
	add_action('wp_head', function() use ($sliderColor) {
		echo '<style>
			.roi-calculator input[type="range"]::-webkit-slider-thumb {
				background: ' . $sliderColor . ';
				border: 2px solid ' . $sliderColor . ';
			}

			.roi-calculator input[type="range"]::-moz-range-thumb {
				background: ' . $sliderColor . ';
				border: 2px solid ' . $sliderColor . ';
			}

			.roi-calculator input[type="range"]::-ms-thumb {
				background: ' . $sliderColor . ';
				border: 2px solid ' . $sliderColor . ';
			}

			.roi-calculator input[type="range"]::-webkit-slider-runnable-track {
				background: ' . $sliderColor . ';
			}

			.roi-calculator input[type="range"]::-moz-range-progress {
				background: ' . $sliderColor . ';
			}

			.roi-calculator input[type="range"]::-ms-fill-lower {
				background: ' . $sliderColor . ';
			}
		</style>';
	});

    ob_start();
    ?>
    <div class="roi-calculator" 
        style="background-color: <?= esc_attr($backgroundColor); ?>; color: <?= esc_attr($textColor); ?>;"
        data-calculations='<?= esc_attr(wp_json_encode($calculated_fields)); ?>'>
        
        <div class="row">
            <?php foreach ($input_fields as $field) : ?>
                <div class="col-md-6">
                    <label class="roi-label">
                        <?= esc_html($field['label']); ?>
                        <input 
                            type="<?= esc_attr($field['type'] === 'range' ? 'range' : ($field['type'] === 'money' ? 'number' : $field['type'])); ?>"
                            data-type="<?= esc_attr($field['type']); ?>"
                            data-key="<?= esc_attr($field['key']); ?>"
                            data-percentage="<?= esc_attr($field['isPercentage'] ?? 'no'); ?>"
                            min="<?= esc_attr($field['min'] ?? 0); ?>"
                            max="<?= esc_attr($field['max'] ?? 100); ?>"
                            step="<?= esc_attr($field['step'] ?? 1); ?>"
                            value="<?= esc_attr($field['value'] ?? ($field['type'] === 'range' ? 50 : '')); ?>" />
                        <?php if ('range' === $field['type']) : ?>
                            <span class="range-value">
                                <?php
                                $value = isset($field['value']) ? $field['value'] : '';
                                $isPercentage = isset($field['isPercentage']) && $field['isPercentage'] === 'yes';
                                ?>
                                <?= esc_attr($value); ?><?= $isPercentage ? '%' : ''; ?>

                            </span> 
                        <?php endif; ?>
                    </label>
                </div>
            <?php endforeach; ?>
        </div>

        <hr class="line">

        <div class="roi-results row">
            <?php
            $fields = $calculated_fields;
            foreach ($fields as $index => $field) :
                $colSize = 'col-md-4';
                $bigFont = '';
                if ($index < 2) {
                    $colSize = 'col-md-6';
                    $bigFont = 'big-font';
                }
            ?>
                <div class="<?=$colSize; ?> <?=$bigFont;?> d-flex justify-content-center align-items-center text-center">
                    <p class="roi-result" data-key="<?= esc_attr($field['key']); ?>">
                        <?= esc_html($field['label']); ?>: <br><span>0</span>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
    <?php
    return ob_get_clean();
}
