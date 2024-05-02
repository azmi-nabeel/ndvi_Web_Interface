const Replicate  = require('replicate');

require('dotenv').config();
const replicate = new Replicate({
	auth: process.env.API_KEY_MODEL
});


const model = "yorickvp/llava-v1.6-34b:41ecfbfb261e6c1adf3ad896c9066ca98346996d7c4045c5bc944a79d430f174";

async function promptImageResponse(image, prompt){
	const input = {
    	image: image,
    	prompt: prompt, 
	};
	return replicate.run(model, { input });
}

async function promptResponse(prompt){
	const input = {
		prompt: prompt
	};
	
	return replicate.run(model, { input });
}

module.exports = { promptImageResponse, promptResponse }