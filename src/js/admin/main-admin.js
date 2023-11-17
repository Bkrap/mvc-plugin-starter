// import openAiFetch from 'open-ai-fetch';


(function( $ ) {
	'use strict';
	
	jQuery(document).ready(function () {

		console.log("Admin js wegsreraheraheraherhaerjhaerjheahe ");
		/**
		 * Open AI API return img data in base64 format
		 */
		let OPENAI_API_KEY = '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';
		let generateForm = document.querySelector('.generate-form');

		let encodeImage = (imgDataArray) => {
			console.log(imgDataArray);
			imgDataArray.forEach((v, k) => {
				console.log(v);
				let imgCard = document.querySelectorAll('.img-card')[0];
				let imgElement = imgCard.querySelector('img');
				console.log(imgElement);

				let generatedImg = `data:image/png;base64,${v.b64_json}`;
				imgElement.src = generatedImg;

				console.log(imgElement);

				imgElement.onload = () => {
					console.log('image loaded');
				}

			})
		}

		let handleFormSubmission = (e) => {
			e.preventDefault();

			let userPrompt = document.querySelector('#prompt-input').value;
			let userImgNum = document.querySelector('#img-quantity').value;

			let imgCardMarkup = Array.from({length: userImgNum}, () => {
				return `
					<div class="img-card">
						<img src="" alt="Generated Image">
					</div>
				`;
			}).join('');

			document.querySelector('.img-container').innerHTML = imgCardMarkup;

			generateAiImages(userPrompt, userImgNum);

		}

		if( generateForm ) {
			generateForm.addEventListener('submit', handleFormSubmission);
		}


		let generateAiImages = async (userPrompt, userImgNum) => {
			try {
				let response = await fetch('https://api.openai.com/v1/images/generations', {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${OPENAI_API_KEY}`,	
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						prompt: userPrompt,
						n: parseInt(userImgNum),
						size: '256x256',
						response_format: 'b64_json'
					})
				})

				if( !response.ok ) {
					throw Error(response.statusText + " response not ok!");
				}

				let { data } = await response.json();
				data.forEach((k, v) => {
					console.log(k, v);
				})

				encodeImage([...data]);
			}
			catch(error) {
				console.log(error);
			}
		}

		let models = async () => {
			try {
				let response = await fetch('https://api.openai.com/v1/models', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${OPENAI_API_KEY}`
					}
				})

				if( !response.ok ) {
					throw Error(response.statusText + " response not ok!");
				}

				let { data } = await response.json();

				console.log(data);

			}
			catch(error) {
				console.log(error);
			}
		}

		let generateSpeech = async (textData = "null, please insert. Nema Vishe") => {
			try {
				let mainDiv = document.querySelector('.playground-field-results');

				let response = await fetch('https://api.openai.com/v1/audio/speech', {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${OPENAI_API_KEY}`,	
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"model": "tts-1-hd",
						"input": textData,
						"voice": "alloy"
					}),
					responseType: "arraybuffer"
				})

				if( !response.ok ) {
					throw Error(response.statusText + " response not ok!");
				}

				let data = await response.arrayBuffer();

				const reader = new FileReader();
				const blob = new Blob([data], { 
					type: 'audio/ogg' 
				});

				// When the FileReader has finished loading the Blob data
				reader.onloadend = function() {
					const audioSrc = reader.result;
					const audio = document.createElement('audio');

					audio.src = audioSrc;
					audio.controls = true;
					mainDiv.appendChild(audio);
				};

				reader.readAsDataURL(blob);

			}
			catch(error) {
				console.log(error);
			}
		}

		let translateAudioToText = async (audioUrl = "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3") => {
			try {
				let mainDiv = document.querySelector('.playground-field-results');


				const reader = new FileReader();
				const blob = new Blob([audioUrl], { 
					type: 'audio/mp3' 
				});

				// When the FileReader has finished loading the Blob data
				reader.onloadend = function() {
					audio.src = audioSrc;
					audio.controls = true;
					mainDiv.appendChild(audio);
				};

				reader.readAsDataURL(blob);

				let response = await fetch('https://api.openai.com/v1/audio/translations', {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${OPENAI_API_KEY}`,	
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"model": "whisper-1",
						"file": reader.readAsDataURL(blob),
					}),
					responseType: "arraybuffer"
				})

				if( !response.ok ) {
					throw Error(response.statusText + " response not ok!");
				}

				let data = await response.json();
				console.log(data);

			}
			catch(error) {
				console.log(error);
			}
		}

		/**
		 * Speech!
		 */
		generateSpeech("Ja sam iz Hrvatske, želim pričati Hrvatski. Dolazim iz Zagreba i oke mi je.");


		// translateAudioToText("https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3");

		/**
		 * ACF PARSE TO IMG (no group)
		 */
		// Fetch the ACF field value for the image using the ACF WP API
		let pageId = 2278;
		let testUrl = "http://localhost/argo/wp-content/uploads/2023/08/inx-cobb-trooper-shooter-cam-bwc3-080123.jpg";

		if ( typeof acf !== 'undefined' ) {
			console.log( 'ACF is defined', acf );

				// // Parse the ACF image value and save it to the image field
				let imageField = acf.getField('field_655299cae4b46');
				// let textField = acf.getField('field_6552a26d77df3');

				// // Set the URL of the image field
				// imageField.set('url', testUrl);
				// acf.set(textField, "test text");

				console.log(imageField);

				acf.addAction('acf/update_field', function(field) {
					if (field.key === 'field111_655299cae4b46') {
						console.log("it is!");
					field.value = testUrl;
					console.log("assign" + testUrl);
					console.log("assign" + field.value);
					} else if(field.key === 'field_6552a26d77df3') {
						console.log("it is!");
						field.value = "test text";
						console.log("assign" + testUrl);
						console.log("assign" + field.value);
					}
				});

				console.log( 'ACF is defined', acf );

			  
			  acf.doAction('acf/update_field', { key: 'field_655299cae4b46' });
		}

			// fetch(`/wp-json/wp/v2/pages/${pageId}`)
			// .then(response => response.json())
			// .then(data => {
			// let acfImage = data.acf.image;

			// console.log(data);

			// // Parse the ACF image value and save it to the image field
			// let imageField = document.querySelector('#image-field');
			// imageField.src = acfImage.url;

			// // Save the image to the WordPress media library when the page is published
			// document.addEventListener('DOMContentLoaded', function() {
			// 	let publishButton = document.querySelector('#publish');
			// 	publishButton.addEventListener('click', function() {
			// 	// Check if the image field has a value
			// 	if (acfImage) {
			// 		// Save the image to the media library
			// 		wp.media.editor.send.attachment = function(props, attachment) {
			// 		// Get the attachment ID
			// 		let attachmentId = attachment.id;

			// 		// Update the ACF image field with the attachment ID
			// 		acfImage.id = attachmentId;
			// 		acfImage.url = attachment.url;

			// 		// Save the updated ACF field using the ACF WP API
			// 		fetch(`/wp-json/acf/v3/pages/${pageId}`, {
			// 			method: 'POST',
			// 			headers: {
			// 			'Content-Type': 'application/json',
			// 			},
			// 			body: JSON.stringify({
			// 			fields: {
			// 				image: acfImage,
			// 			},
			// 			}),
			// 		});
			// 		};
			// 	}
			// 	});
			// });
			// });


	});

})( jQuery );