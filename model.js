const Replicate  = require('replicate');

require('dotenv').config();
async function promptResponse(image, prompt){
	const replicate = new Replicate({
		auth: process.env.API_KEY_MODEL
	});
	const input = {
    	image: image,
    	prompt: prompt, 
	};
	const model = "yorickvp/llava-v1.6-34b:41ecfbfb261e6c1adf3ad896c9066ca98346996d7c4045c5bc944a79d430f174"
	return replicate.run(model, { input });
}

module.exports = { promptResponse }