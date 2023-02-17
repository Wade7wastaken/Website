const fs = require("fs");
const https = require("https");

function coolmath() {
	let output = [];
	const url = "https://www.coolmathgames.com/1-complete-game-list/view-all";

	https.get(url, (res) => {
		res.on()
	});
}

(() => {
	let output = {};
	output.coolmath = coolmath();

	//fs.writeFile("./output.js", "const links = " + JSON.stringify(output), (err) => {
		//if (err) console.log(err);
	//});
})();
