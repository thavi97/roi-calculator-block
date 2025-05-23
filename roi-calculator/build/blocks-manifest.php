<?php
// This file is generated. Do not modify it manually.
return array(
	'roi-calculator' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/roi-calculator',
		'version' => '0.1.0',
		'title' => 'Roi Calculator',
		'category' => 'widgets',
		'icon' => 'calculator',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'inputFields' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'calculatedFields' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#286cfc'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'sliderColor' => array(
				'type' => 'string',
				'default' => '#00cc66'
			),
			'fontSize' => array(
				'type' => 'string',
				'default' => '16px'
			)
		),
		'textdomain' => 'roi-calculator',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
