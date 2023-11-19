// import generateSpeech from './models/generateSpeech.js';



(function( $ ) {
	'use strict';
	
	jQuery(document).ready(function () {

		console.log("Admin js");
		/**
		 * Open AI API return img data in base64 format
		 */
		let OPENAI_API_KEY = '';
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

			let userPrompt = document.querySelector('#textInput').value;
			let userImgNum = document.querySelector('#img-quantity').value;
			let textAreaValue = document.querySelector('#text-to-speech').value;

			let imgCardMarkup = Array.from({length: userImgNum}, () => {
				return `
					<div class="img-card">
						<img src="" alt="Generated Image">
					</div>
				`;
			}).join('');

			document.querySelector('.img-container').innerHTML = imgCardMarkup;

			if( userPrompt ) {
				generateAiImages(userPrompt, userImgNum);
			}
			// translateAudioUrlToText(textAreaValue);
			if( textAreaValue ) {
				generateSpeech(textAreaValue);
			}

		}

		if( generateForm ) {
			generateForm.addEventListener('submit', handleFormSubmission);
		}
		
		/**
		 * Audio record
		 */
		let rec;
		let audioChunks;
		async function recordAudioStreamToTextResult() {
			try {
			  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			  await recordAudioStreamToText(stream);
			  return recordAudioStreamToText(stream);
			} catch (error) {
			  console.log(error);
			}
		}
		  
		function recordAudioStreamToText(stream) {
			try {
				rec = new MediaRecorder(stream);
				rec.ondataavailable = async (e) => {
	
					audioChunks.push(e.data);
					if (rec.state == "inactive"){
						let blob = new Blob(audioChunks,{type:'audio/mp3'});
						recordedAudio.src = URL.createObjectURL(blob);
						recordedAudio.controls = true;
						recordedAudio.autoplay = true;
	
						// Parse to audio element and joinHTML
						sendData(blob);
						let translationResult = await translateAudioFileToText(blob);
						generateSpeech(translationResult.text);
					}
	
				}
			}
			catch(error) {
				console.log(error);
			}
		}

		function sendData(data) {}

			record.onclick = e => {
				record.disabled = true;
				stopRecord.disabled = false;
				record.style.backgroundColor = "blue"
				audioChunks = [];
				rec.start();
			}

			stopRecord.onclick = e => {
				record.disabled = false;
				stop.disabled=true;
				record.style.backgroundColor = "red"
				rec.stop();
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

		let translateAudioUrlToText = async (audioFilePath = "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3") => {
			try {
			  const formData = new FormData();
			  const file = await fetch(audioFilePath).then(response => response.blob());
			  formData.append("file", file);
			  formData.append("model", "whisper-1");
		  
			  const response = await fetch('https://api.openai.com/v1/audio/translations', {
				method: 'POST',
				headers: {
				  'Authorization': `Bearer ${OPENAI_API_KEY}`,
				},
				body: formData
			  });
		  
			  if (!response.ok) {
				throw Error(response.statusText + " response not ok!");
			  }
		  
			  const data = await response.json();
			  console.log(data);
			} catch (error) {
			  console.log(error);
			}
		};

		let translateAudioFileToText = async (file) => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("model", "whisper-1");
		
			const response = await fetch('https://api.openai.com/v1/audio/translations', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${OPENAI_API_KEY}`,
			},
			body: formData
			});
		
			if (!response.ok) {
			throw Error(response.statusText + " response not ok!");
			}
		
			const data = await response.json();
			return data;
			
		} catch (error) {
			console.log(error);
		}
		};
		  

		let generateSpeech = async (textData = "No input man!") => {
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
						"voice": "onyx"
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

		/**
		 * Speech!
		 */
		generateSpeech("Hrvatski pričam, iz Zagreba sam. Kud moji mili moji... otvor' ženo kapiju... Jao man'se oče naša!!! Evo mene i mojih pajdaša! Jihawww!!");
		translateAudioUrlToText("https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3");
		recordAudioStreamToTextResult();
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