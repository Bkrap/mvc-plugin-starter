<div class="wrap">
  <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
  <form action="" method="post">
    <!-- form fields here -->
    <div class="playground-field">
        <label for="playground-field">Playground Field</label>
        <input type="text" name="textInput" id="textInput">
        <div class="playground-field-results">

        </div>
    </div>
    <?php submit_button(); ?>
  </form>
</div>