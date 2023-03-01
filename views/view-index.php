<?php


if ( is_admin() ) { // Admin View

    include('admin/admin-page.php');

} else { // Public View

    include('public/form.php');

}

    