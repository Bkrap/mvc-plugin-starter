<?php

if ( is_admin() ) { // Admin View

    // admin-page.php view is init in Admin_Page_Controller.php with renderAdminPage() method

} else { // Public View

    include('public/form.php');

}

    