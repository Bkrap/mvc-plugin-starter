export {
    generateSpeech
}
// let generateSpeech = async (textData = "null, please insert. Nema Vishe") => {
//     try {
//         let mainDiv = document.querySelector('.playground-field-results');

//         let response = await fetch('https://api.openai.com/v1/audio/speech', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${OPENAI_API_KEY}`,	
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 "model": "tts-1-hd",
//                 "input": textData,
//                 "voice": "alloy"
//             }),
//             responseType: "arraybuffer"
//         })

//         if( !response.ok ) {
//             throw Error(response.statusText + " response not ok!");
//         }

//         let data = await response.arrayBuffer();

//         const reader = new FileReader();
//         const blob = new Blob([data], { 
//             type: 'audio/ogg' 
//         });

//         // When the FileReader has finished loading the Blob data
//         reader.onloadend = function() {
//             const audioSrc = reader.result;
//             const audio = document.createElement('audio');

//             audio.src = audioSrc;
//             audio.controls = true;
//             mainDiv.appendChild(audio);
//         };

//         reader.readAsDataURL(blob);

//     }
//     catch(error) {
//         console.log(error);
//     }
// }