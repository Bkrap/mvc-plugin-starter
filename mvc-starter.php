<?php
/*
Plugin Name: MVC Starter
Description: An example of MVC implementation in WordPress plugin
Version: 1.0.0.0
Author: Bruno Krapljan
Author URI: web-throne.org
*/

class MVC_Starter {
 
    public function __construct() {

        // Define folder structure
        define('MODEL_ADMIN_DIR', plugin_dir_path( __FILE__ ) . 'models/admin/' );
        define('VIEW_ADMIN_DIR', plugin_dir_path( __FILE__ ) . 'views/admin/' );
        define('CONTROLLER_ADMIN_DIR', plugin_dir_path( __FILE__ ) . '/controllers/admin/' );

        define('MODEL_PUBLIC_DIR', plugin_dir_path( 'models/public/', __FILE__ ));
        define('VIEW_PUBLIC_DIR', plugin_dir_path( 'views/public/', __FILE__ ));
        define('CONTROLLER_PUBLIC_DIR', plugin_dir_path( 'controllers/public/', __FILE__ ));

        define('MODEL_DIR', plugin_dir_path( 'models/', __FILE__ ));
        define('VIEW_DIR', plugin_dir_path( 'views/', __FILE__ ));
        define('CONTROLLER_DIR', plugin_dir_path( 'controllers/', __FILE__ ));

        // Add actions and filters
        add_action( 'init', array( $this, 'init' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_public_scripts' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );

    }
 
    public function init() {
        // Initialize the MVC components
        $this->init_controllers();
        $this->init_models();
        $this->init_views();
    }
 
    public function init_controllers() {
        // Load the controllers
        include_once( 'controllers/controller-index.php' );
    }
 
    public function init_models() {
        // Load the models
        include_once( 'models/model-index.php' );
    }
 
    public function init_views() {
        // Load the views
        include_once( 'views/view-index.php' );
    }
 
    public function enqueue_public_scripts() {
        // Enqueue the public styles
        wp_enqueue_style( 'mvc-starter-public-style', plugins_url( 'dist/style-public.css', __FILE__ ), array(), '1.0.0' );
 
        // Enqueue the public scripts
        wp_enqueue_script( 'mvc-starter-public-script', plugins_url( 'dist/public.js', __FILE__ ), array( 'jquery' ), '1.0.0', false );
        $ajax_url = admin_url( 'admin-ajax.php' );
        wp_localize_script( 'mvc-starter-public-script', 'my_script_vars', array(
            'ajax_url' => $ajax_url,
        ));
    }
 
    public function enqueue_admin_scripts() {
        // Enqueue the admin styles
        wp_enqueue_style( 'mvc-starter-admin-style', plugins_url( 'dist/style-admin.css', __FILE__ ), array(), '1.0.0' );
 
        // Enqueue the admin scripts
        wp_enqueue_script( 'mvc-starter-admin-script', plugins_url( 'dist/admin.js', __FILE__ ), array( 'jquery' ), '1.0.0', false );
    }
 
}
 
$mvc_starter = new MVC_Starter();