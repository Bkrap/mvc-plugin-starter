<?php
class Admin_Page_Controller {
  public function __construct() {
    add_action('admin_menu', array($this, 'addAdminPage'));
  }

  public function addAdminPage() {
    add_menu_page(
      'Admin Page Title',
      'Admin Page Menu Title',
      'manage_options',
      'admin-page',
      array($this, 'renderAdminPage')
    );
  }

  public function renderAdminPage() {
    require_once(MODEL_ADMIN_DIR . 'Admin_Page_Model.php');
    $model = new Admin_Page_Model();
    $data = $model->getData();
    require_once(VIEW_ADMIN_DIR . 'admin-page.php');
  }

}
new Admin_Page_Controller();