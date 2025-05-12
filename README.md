# ROI Calculator Block (WordPress Gutenberg Block)

A customizable ROI (Return on Investment) calculator block for WordPress. Easily configure input fields, calculated outputs, and styling via the block editor.

---

## Features

- Add custom input fields: number, text, money, or slider.
- Configure calculated fields using formulas.
- Customize background, text, and slider colors.

---

## Requirements

- WordPress 6.0 or higher
- Node.js (>= 14)
- npm

---

## Local Development Setup

### 1. Set Up a Local WordPress Environment

To run this plugin, you need a local WordPress installation.

You can download the latest version of Wordpress here: https://wordpress.org/download/

Extract the downloaded folder into your local dev environment's htdocs folder.


---

### 2. Install the Plugin

To install the plugin, download this project and copy the plugin in this project from wp-content\plugins\roi-calculator-block into your plugins folder.

Remember to activate it on the Wordpress admin.

## To install dependencies run the following commands inside wp-content\plugins\roi-calculator-block\roi-calculator
- npm install
- npm run build

## To start development with file watching
- npm run start

### 3. Use the Plugin
You can use the plugin by creating it in the Gutenberg editor as shown on any page or post
![image](https://github.com/user-attachments/assets/9f310382-67bb-40f7-97cf-66582eb00c6e)

Once created, you can edit the details on the right hand pane. This includes, background colour, font size, labels, formulas etc.
![image](https://github.com/user-attachments/assets/84a3eb17-8a34-4f50-9243-fcde1f3b58b8)

Once the page is saved, view and use the calculator by visiting the page.
![image](https://github.com/user-attachments/assets/41e03cd7-8d77-4a82-8e6b-1b88d325e721)

