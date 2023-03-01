(function( jQuery ) {
	'use strict';

	jQuery(document).ready(function () {
	
		console.log("Public js initialized");
		    // When the form is submitted
			jQuery("#passwordless-login-form-submit").click(function(e){
				e.preventDefault();
				var email = jQuery("#passwordless-login-email").val();
				// Make an AJAX request to send the email
				jQuery.ajax({
					url: my_script_vars.ajaxurl,
					type: 'POST',
					data: {
						action: 'send_token',
						email: email
					},
					success: function(response) {
						if (response == "success") {
							// Show a success message
							jQuery("#passwordless-login-message").html("An email with a login link has been sent to the entered email address.");
						} else {
							// Show an error message
							jQuery("#passwordless-login-message").html("An error occurred while trying to send the email. Please try again later.");
						}
					}
				});
			});
		});
	
})( jQuery );
