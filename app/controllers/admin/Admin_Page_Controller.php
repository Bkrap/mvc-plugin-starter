<?php

/**
 * Admin page controller
 * Communicates between model and view to be shown on admin page
 * @since 1.0.0.
 */
class Admin_Page_Controller {

  public function __construct() {
    add_action('admin_menu', array($this, 'addAdminPage'));
  }

  public function addAdminPage() {
    $Admin_Page_Model = new Admin_Page_Model();

    add_menu_page(
      $Admin_Page_Model::PAGE_TITLE,
      $Admin_Page_Model::MENU_TITLE,
      $Admin_Page_Model::CAPABILITY,
      $Admin_Page_Model::MENU_SLUG,
      array($this, 'renderAdminPage')
    );
  }

  public function renderAdminPage() {
    require_once(MODEL_DIR . 'admin/Admin_Page_Model.php');
    require_once(VIEW_DIR . 'admin/admin-page.php');
  }

}

new Admin_Page_Controller();