<div class="wrap">
  <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
  <form action="" method="post" class="generate-form">
    <!-- form fields here -->
    <div class="playground-field">
        <label for="playground-field">Playground Field</label>
        <input type="text" name="textInput" id="textInput">
        <select name="img-quantity" id="img-quantity">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <label for="text-to-speech">Text to speech</label>
        <textarea name="text-to-speech" id="text-to-speech" cols="30" rows="10"></textarea>
       
        <div id="record-controller">
          <button id=record></button>
          <button id=stopRecord disabled>Stop</button>
        </div>
        <div id="recorder-audio-result">
          <audio id=recordedAudio></audio>
        </div>

        <div class="playground-field-results">
        </div>
        <div class="img-container">
        </div>
    </div>
    <?php submit_button(); ?>
  </form>
</div>