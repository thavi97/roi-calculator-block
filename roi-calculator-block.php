<?php

/**
 * Plugin Name: ROI Calculator Block
 * Description: A customizable ROI calculator Gutenberg block.
 * Author: Thavi Tennakoon
 */

function roi_calculator_block_init()
{
    register_block_type(__DIR__ . '/roi-calculator/build/roi-calculator');
}
add_action('init', 'roi_calculator_block_init');
